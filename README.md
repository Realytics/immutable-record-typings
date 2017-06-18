# Immutable Record Typings
[![Npm version](https://img.shields.io/npm/v/immutable-record-typings.svg?style=flat-square)](https://www.npmjs.com/package/immutable-record-typings)

Typings for Immutable Record which provides better type safety out of the box.
 
## Installation
This plugin requires minimum **immutable 3.8.1**, **typescript 2.3.0**
```sh
npm install --save-dev immutable-record-typings
```

There are two ways to enable typings augmentation:

Recommended way is adding `"./node_modules/immutable-record-typings/*"` to `include` section in your `tsconfig.json`, here is an example:
 ```json
 {
   "compilerOptions": {},
   "include": [
     "./src/**/*",
     "./node_modules/immutable-record-typings/*"
   ]
 }
```

You can also `import 'immutable-record-typings'` in entry file of your application instead of adding it to `tsconfig.json`.

We don't provide it as a `@types` package because it would be not compatible with current typings.
So the safer way is to provide it as separate npm package.
Also Immutable v4 is on the way with similar typings :)

## Features
This package adds generic type to the `Record` definition. Thanks to this, we can make records type safe 
(excluding `mergeIn`, `mergeDeepIn`, `setIn`, `deleteIn`, `removeIn` and `updateIn` methods - typescript limitations).

Let's say that we have `Post.ts` file:
```typescript
import { Record, List } from 'immutable';
import { User } from './User';
import { Comment } from './Comment';

// we use PascalCase because of names conflicts issue in records - 
// for example groupBy field will not work, because Record already has groupBy method
export interface Post {
  Title: string;
  Author: User;
  Content: string;
  Comments: List<Comment>;
}

export const PostRecord = Record<Post>({
  Title: '',
  Author: undefined,
  Content: '',
  Comments: List<Comment>()
});
```

Or if we are minimalist. we can make it even shorter - typescript will guess `PostRecord` type:
```typescript
import { Record, List } from 'immutable';
import { UserRecord } from './User';
import { CommentRecord } from './Comment';

export const PostRecord = Record({
  Title: '',
  // we can't just set `undefined` - typescript will not be able to guess Author field type
  // it's a small hack here - there is no `UNDEFINED` field on `UserRecord` object so the value will be `undefined`
  // but because of typings (UNDEFINED: Record<T>) - it will use proper type :) 
  Author: UserRecord.UNDEFINED,
  Content: '',
  // another special field - it's the same as UserRecord.UNDEFINED, but with more suitable name
  Comments: List<typeof CommentRecord.INSTANCE>()
});
```

To create new record object, we can use functional or object-oriented approach:
```typescript
import { PostRecord } from './Post';

const postA = PostRecord({ Title: 'TypeScript is awesome!' });
const postB = new PostRecord({ Title: 'Immutable.js too' });
```

To extend record class, use `extends` keyword:
```typescript
import { PostRecord } from './Post';
import { UserRecord } from './User';

export class AwesomePost extends PostRecord {
  
  get Title(): string {
    return `[AWESOME NEWS] ${this.get('Title')}!`;
  }
}
```

## License
MIT
