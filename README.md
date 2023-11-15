# gdsc-voting-api

## Overview

This is an api for a voting event. You can add some user or the candidate to be voted to this api. You can also delete user / candidate, reset all data, show all data, and many more.

## Base URL

You can use the deployment here

`https://mie-intel-gdsc-voting-api.cyclic.app/`

## API endpoints structure

```
/       # API Homepage
    /user
        /create     # create a / some user account
        /delete     # delete an user account
        /showAll    # show all user detail data
    /candidate
        /create     # create new candidate account
        /delete     # delete a candidate account
        /vote       # to make a new vote
        /showAll    # show all candidate detail data
    /showAll        # show all user and candidate data
    /resetAllVote   # reset all vote has been made by the user
    /deleteAll      # delete all user and candidate account
```

## Technology used by this API

1. Express JS
2. MongoDB

## Usage Documentation

### API Model

This API use 2 different data model. These are:

1. user

   This model store an array of user account. The structure of this model is shown below

   ```
   {
    username    :   <a string of username>
    password    :   <a string of password>
    hasVote     :    <a string of which candidate is voted by the user>
   }
   ```

2. candidate

   This model store an array of candidate. The structure of this model is shown below

   ```
   {
    candidateName  :   <a string of candidate's name>
    voteCount      :   <a number show the number of user has vote the candidate>
   }
   ```

### API endpoints

#### Create new user

This feature will create a / some new account. It has the following request formats

```
    {
        method: POST
        endpoint: /user/create
        body:{
            [
                {
                    'username': 'user1'
                    'password': 'pass1'
                },
                {
                    'username': 'user2'
                    'password': 'pass2'
                },
                // etc
            ]
        }
    }
```

This will create 2 users account `user1` with password `pass1` and `user2` with password `pass2`

This is the example data saved by the server

```
    [
        {
            "_id": "6554ad3f299685aca80344e2",
            "username": "user1",
            "password": "pass1",
            "hasVote": "",
            "__v": 0
        },
        {
            "_id": "6554ad3f299685aca80344e5",
            "username": "user2",
            "password": "pass2",
            "hasVote": "",
            "__v": 0
        }
    ]
```

#### Delete an user

This feature will delete the specified user account. It has the following request format

```
    {
        method: DELETE
        endpoint: /user/delete
        body:{
            {
                "username": "user1"
            }
        }
    }
```

This will delete `user1` from the database

#### Show all users data

This feature will show all registered users data. It has the following formats

```
    {
        method: GET
        endpoint: /user/showAll
    }
```

This will return a json data consist of every registered users data. This is the example of the json data.

```
    {
        "user": [
            {
                "_id": "6554ad3f299685aca80344e2",
                "username": "user1",
                "password": "pass1",
                "hasVote": "",
                "__v": 0
            },
            {
                "_id": "6554ad3f299685aca80344e5",
                "username": "user2",
                "password": "pass2",
                "hasVote": "",
                "__v": 0
            }
        ]
    }
```

#### Create new candidate

This feature wil create a new candidate account. It has the following formats.

```
    {
        method: POST
        endpoint: /candidate/create
        body:{
            {
                "candidateName": "candidate1"
            }
        }
    }
```

It will create a new candidate account with `0` vote count. This is the example data saved by the server.

```
    {
        "candidateName": "candidate1",
        "voteCount": 0,
        "_id": "6554c8909a6cc096af66a5da",
        "__v": 0
    }
```

#### Delete a candidate

#### Make a vote

#### Show all candidates data

#### Show all users and candidates data

#### Reset all users and candidates data

#### Delete all users and candidates account
