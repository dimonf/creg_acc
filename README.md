creg_acc
========

basic accounting double entry system written with help of Express / Node.js / MongoDB

The project goals:

Create basic double entry accounting system with OPA web interface for internal use. Start with standard client 
server implementation with help of Node.js / Express, develop business logic on server side and experiment with 
shifting of application logic to the client side. Aplication is expected to work with distributed database backend.
- multiple companies
- multiple currencies
- complex transactions with multiple Dt/Ct entries
- multiple layers (a single transaction belongs to one layer) to allow for
  ['financial accounts', 'management accouns', 'financial consolidated accounts', 'etc']  
  book records kept in 'parallel'.
- authentication and access control within a layer / company.
