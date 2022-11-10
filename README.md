## Project Structure

Project uses typescript (v4.8.4), node (v18.7.0) and docker (v20.10.17).

Project is role based.

1) We have two main roles - Admin and Standard user.
2) Admin - has access to all the users in his/her admin panel in which he/she can remove, edit, add user(register) by himself.
3) Standard - has no access to users, but has access to one two pages. One, on which user can buy admin rights (stripe) and second, on which user can enter his/her personal information.

Users will be authenticated with JWT, using passport-jwt strategy.

Until first full commit of a project, all the minor changes will be commited to branch 'dev'.