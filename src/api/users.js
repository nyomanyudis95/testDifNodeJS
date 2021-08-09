const express = require('express');
const { Op } = require('sequelize');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const usersModel = require('../model/users');
const utils = require('../utils');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      firstName, lastName, phoneNumber, email
    } = req.body;

    const result = await usersModel.create({
      firstName, lastName, phoneNumber, email
    });
    res.status(200).send({
      message: 'success',
      data: result,
    });
  } catch (err) {
    res.status(404).send({
      message: 'failed',
      error: err,
    });
  }
});

router.patch('/', async (req, res) => {
  try {
    const {
      id, firstName, lastName, phoneNumber, email
    } = req.body;

    const user = await usersModel.findOne({
      where: {
        id
      }
    });

    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.email = email;

    await user.save();

    res.status(200).send({
      message: 'success',
      data: user,
    });
  } catch (err) {
    res.status(404).send({
      message: 'failed',
      error: err,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;
    console.log('id delete = ', req.params);

    const user = await usersModel.destroy({
      where: {
        id
      }
    });

    res.status(200).send({
      message: 'success',
      data: user,
    });
  } catch (err) {
    res.status(404).send({
      message: 'failed',
      error: err,
    });
  }
});

router.get('/', async (req, res) => {
  try {
    let { page, limit, like } = req.query;
    let result;
    if (like == null) {
      like = '';
    }
    if (page == null && limit == null) {
      result = await usersModel.findAll({
        where: {
          [Op.or]: [
            {
              firstName: {
                [Op.like]: `%${like}%`
              },
            },
            {
              lastName: {
                [Op.like]: `%${like}%`
              },
            },
            {
              phoneNumber: {
                [Op.like]: `%${like}%`
              },
            },
            {
              email: {
                [Op.like]: `%${like}%`
              }
            }
          ],
        }
      });
    } else {
      if (page == null) page = 1;
      if (limit == null) limit = 5;

      result = await usersModel.findAll({
        where: {
          [Op.or]: [
            {
              firstName: {
                [Op.like]: `%${like}%`
              },
            },
            {
              lastName: {
                [Op.like]: `%${like}%`
              },
            },
            {
              phoneNumber: {
                [Op.like]: `%${like}%`
              },
            },
            {
              email: {
                [Op.like]: `%${like}%`
              }
            }
          ],
        }
      });
      const finalPage = (Number(page) + 1) <= result.length ? Number(page) : (Number(page) - 1);
      console.log(`page  = ${page}`);
      console.log(`limit  = ${limit}`);
      console.log(`finalPage = ${finalPage}`);
      result = await usersModel.findAll({
        limit: Number(limit),
        offset: finalPage,
        where: {
          [Op.or]: [
            {
              firstName: {
                [Op.like]: `%${like}%`
              },
            },
            {
              lastName: {
                [Op.like]: `%${like}%`
              },
            },
            {
              phoneNumber: {
                [Op.like]: `%${like}%`
              },
            },
            {
              email: {
                [Op.like]: `%${like}%`
              }
            }
          ],
        }
      });
    }
    res.status(200).send({
      message: 'success',
      dataLength: result.length,
      data: result,
    });
  } catch (err) {
    res.status(404).send({
      message: 'failed',
      error: err,
    });
  }
});

router.get('/countUsers', async (req, res) => {
  try {
    const result = await usersModel.count();

    res.status(200).send({
      message: 'success',
      data: result,
    });
  } catch (err) {
    res.status(404).send({
      message: 'failed',
      error: err,
    });
  }
});

module.exports = router;
