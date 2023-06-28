// import { NextApiHandler } from 'next';
// import { CredentialsOptions, signIn } from 'next-auth/client';
// import { User } from '../../types';
// import { verifyCredentials } from '../../utils/verifyCredentials';

// const options: CredentialsOptions = {
//   credentials: {
//     email: { label: 'Email', type: 'text' },
//     password: { label: 'Password', type: 'password' },
//   },
//   async authorize(credentials) {
//     const { email, password } = credentials;
//     const user: User | null = await verifyCredentials(email, password);

//     if (user) {
//       return Promise.resolve(user);
//     } else {
//       return Promise.resolve(null);
//     }
//   },
// };

// const nextAuthHandler: NextApiHandler = (req, res) => signIn('credentials', options, req, res);

// export default nextAuthHandler;
