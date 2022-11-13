import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'AdminUser',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Chiranjib Datta',
    email: 'chiranjib.nita@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Sutapa Deb',
    email: 'sutapa.ce@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
