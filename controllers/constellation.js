const express = require('express');
const getConnection = require('../db');
const {JSDOM} = require('jsdom');

const {window} = new JSDOM('');
const $ = require('jquery')(window);

async function list(req, res, next) {
  const constellation = req.params.constellation;
  const conn = await getConnection();
  const rows = await conn.query({
    sql: 'SELECT * FROM constellations WHERE name = ?'
  }, constellation.toUpperCase());
  const {id} = rows[0];
  const stars = await conn.query({
    sql: 'SELECT * FROM stars WHERE constellation = ?'
  }, id);
  conn.end();
  res.status(200).send(stars);
}

async function create(req, res, next) {
  const constellation = req.params.constellation;
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://api.api-ninjas.com/v1/stars?constellation=${constellation}`,
    method: 'GET',
    headers: {
      'X-Api-Key': '1SgfyU71xVvvjE2QCIR1Jg==pSqw5NSJktKrageC'
    }
  };
  $.ajax(settings).done(async res => {
    const conn = await getConnection();
    const rows = await conn.query({
      sql: 'SELECT * FROM constellations WHERE name = ?'
    }, constellation.toUpperCase());
    const {id} = rows[0];
    await res.forEach(async star => {
      const {name, right_ascension, declination} = star;
      console.log(`${id}, ${name}, ${right_ascension}, ${declination}`);
      await conn.query({
        sql: 'INSERT IGNORE INTO stars \
        (constellation, name, right_ascension, declination) \
        VALUES (?, ?, ?, ?)'
      }, [id, name, right_ascension, declination]);
    });
    conn.end();
  });
  res.status(200).send();
}

module.exports = {list, create};
