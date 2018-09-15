# firefly-utils
Common Object utility to make life easier.


## APIs
- [ObjectUtils](#ObjectUtils)
  - [flatten](#flatten)
  - [unFlatten](#unFlatten)
  - [getValue](#getValue)
  - [setValue](#setValue)
  - [deleteValue](#deleteValue)
  - [deepmerge](#deepmerge)
  - [clone](#clone)
  - [convertToArray](#convertToArray)

- [CryptUtils](#CryptUtils)
  - [encrypt](#encrypt)
  - [decrypt](#decrypt)


## Setup
```sh
$ npm i --save firefly-utils
```

## ObjectUtils

```javascript
const utils = require('firefly-utils').ObjectUtils;
```

## flatten

Converts a nested obeject structure to one level.

```javascript
const data = {
    name:{
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com',
    contact:{
        code:'+91',
        number:1231231230
    }
};

utils.flatten(data);
/* output
{
    name.firstName:'John',
    name.lastName:'Doe',
    email:'john@doe.com',
    contact.code:'+91',
    contact.number:1231231230
}
*/

// you can provide your own separator

utils.flatten(data, '#'); 
/* output
{
    name#firstName:'John',
    name#lastName:'Doe',
    email:'john@doe.com',
    contact#code:'+91',
    contact#number:1231231230
}
*/
```

## unFlatten

Converts an object from flatten state to its normal form.

```javascript
const data = {
    'name.firstName':'John',
    'name.lastName':'Doe',
    'email':'john@doe.com',
    'contact.code':'+91',
    'contact.number':1231231230
};

utils.unFlatten(data);
/* output
{
    name:{
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com',
    contact:{
        code:'+91',
        number:1231231230
    }
}
*/

// you can provide your own separator

const data = {
    'name$firstName':'John',
    'name$lastName':'Doe',
    'email':'john@doe.com',
    'contact$code':'+91',
    'contact$number':1231231230
};

utils.unFlatten(data, '$'); 
/* output
{
    name:{
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com',
    contact:{
        code:'+91',
        number:1231231230
    }
}
*/
```

## getValue

Retrivies value from a nested object using key as path.

```javascript
const data = {
    name:{
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com',
    contact:{
        code:'+91',
        number:1231231230
    }
};

utils.getValue('name.firstName', data);
/* output
John
*/

// you can provide your own separator

utils.getValue('name@firstName', data, '@');
/* output
John
*/
```

## setValue

Sets value in a nested object using key as path.

```javascript
const data = {
    name:{
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com',
    contact:{
        code:'+91',
        number:1231231230
    }
};

utils.setValue('name.title', data, 'Mr.');
/* data object is updated to
{
    name:{
        title:'Mr',
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com',
    contact:{
        code:'+91',
        number:1231231230
    }
}
*/

// you can provide your own separator

utils.setValue('name@title', data, 'Mr.', '@');
/* data object is updated to
{
    name:{
        title:'Mr',
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com',
    contact:{
        code:'+91',
        number:1231231230
    }
}
*/
```

## deleteValue

Delete value from a nested object using key as path.

```javascript
const data = {
    name:{
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com',
    contact:{
        code:'+91',
        number:1231231230
    }
};

utils.deleteValue('contact.code', data);
/* data object is updated to
{
    name:{
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com',
    contact:{
        number:1231231230
    }
}
*/

// you can provide your own separator

utils.deleteValue('contact@code', data, '@');
/* data object is updated to
{
    name:{
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com',
    contact:{
        number:1231231230
    }
}
*/
```

## deepmerge

Merge two objects.

```javascript
const data1 = {
    name:{
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com'
};

const data2 = {
    contact:{
        code:'+91',
        number:1231231230
    }
};

utils.deepmerge(data1, data2);
/* output
{
    name:{
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com',
    contact:{
        code:'+91',
        number:1231231230
    }
}
*/
```


## clone

Makes an exact copy of the provided object.

```javascript
const data = {
    name:{
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com',
    contact:{
        code:'+91',
        number:1231231230
    }
};

utils.clone(data);
/* output
{
    name:{
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com',
    contact:{
        code:'+91',
        number:1231231230
    }
}
*/
```

## convertToArray

Converts and Object to an Array.
```javascript
const data = {
    name:{
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com',
    contact:{
        code:'+91',
        number:1231231230
    }
};

utils.convertToArray(data);
/* output
[
    {
        key:'name',
        value:{
            firstName:'John',
            lastName:'Doe'
        }
    },
    {
        key:'email',
        value:'john@doe.com'
    },
    {
        key:'contact',
        value:{
            code:'+91',
            number:1231231230
        }
    }
]
*/

// Convert recursively
utils.convertToArray(data, true);
/* output
[
    {
        key:'name',
        value:[
            {
                key:'firstName',
                value:'John'
            },
            {
                key:'lastName',
                value:'Doe'
            }
        ]
    },
    {
        key:'email',
        value:'john@doe.com'
    },
    {
        key:'contact',
        value:[
            {
                key:'code',
                value:'+91'
            },
            {
                key:'number',
                value:1231231230
            }
        ]
    }
]
*/
```

## CryptUtils

```javascript
const utils = require('firefly-utils').CryptUtils;
```

## encrypt

Encrypts anyting.

```javascript
const data = {
    name:{
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com',
    contact:{
        code:'+91',
        number:1231231230
    }
};
const secret = 'MY_SECRET_KEY';

utils.encrypt(data,secret);
/* output
ENCRYPTED_STRING
*/
```

## decrypt

Decrypts a string and returns as object if it is.

```javascript
const data = 'ENCRYPTED_STRING';
const secret = 'MY_SECRET_KEY';

utils.decrypt(data,secret);
/* output
{
    name:{
        firstName:'John',
        lastName:'Doe'
    },
    email:'john@doe.com',
    contact:{
        code:'+91',
        number:1231231230
    }
}
*/
```