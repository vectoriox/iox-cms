

#!/bin/sh
mongo iox-db --eval "db.createUser({user:'admin',pwd:'admin',roles:['readWrite','dbAdmin']})"