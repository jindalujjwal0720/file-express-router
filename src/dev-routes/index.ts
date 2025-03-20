/**
 * This file was automatically generated by fer: file-express-router.
 * Generated on: Thursday, March 20, 2025 at 4:19:47 PM GMT+5:30
 * Do not modify it manually.
 */
import { Router } from 'express';
import { handler as a } from './error.error';
import { handler as b } from './hello.get';
import { handler as c } from './index.get';
import { handler as d } from './users/auth.middleware';
import { handler as e } from './users/authz.middleware';
import { handler as f } from './users/create.post';
import { handler as g } from './users/index.get';
import { handler as h } from './users/update.patch';
import { handler as i } from './[path]/home.get';
import { handler as j } from './[path]/name/hello.get';

const k = Router({ mergeParams: true });

// (root)
const l = Router({ mergeParams: true });

k.use('/', l);
l.get('/hello', b);
l.get('/', c);

// users
const m = Router({ mergeParams: true });
l.use(d);
l.use(e);
l.use('/users', m);
m.post('/create', f);
m.get('/', g);
m.patch('/update', h);

// [path]
const n = Router({ mergeParams: true });

l.use('/:path', n);
n.get('/home', i);

// [path]/name
const o = Router({ mergeParams: true });

n.use('/name', o);
o.get('/hello', j);

k.use(a);

export default k;
