// import { ConnectionConfig, connect } from 'tidb';
// import bcrypt from 'bcrypt';
// import { User } from '../types';

// const tidbConfig: ConnectionConfig = {
//   host: 'localhost',
//   port: 4000,
//   user: 'root',
//   password: 'password',
//   database: 'myapp',
// };

// const verifyCredentials = async (email: string, password: string): Promise<User | null> => {
//   try {
//     const connection = await connect(tidbConfig);
//     const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
//     const [rows] = await connection.query<User[]>(query, [email]);

//     if (rows.length === 1) {
//       const user: User = rows[0];
//       const passwordsMatch = await bcrypt.compare(password, user.password);

//       if (passwordsMatch) {
//         return user;
//       }
//     }

//     return null;
//   } catch (error) {
//     console.error('Error verifying user credentials:', error);
//     return null;
//   }
// };

// export { verifyCredentials };
