# Frontend Blog

A simple frontend blog built using Vuejs and tailwind to consume a REST API.  
This app contais following features:  
1. Login  
2. Register  
3. Create blog 
4. Filter blogs  
5. Add comment in a blog    
6. Like/dislike a blog  
7. Like/dislike a comment 
8. Edit and delete a blog/comment

## Run Locally

Clone the project

```bash
    git clone https://github.com/firman19/vuejs-tailwind.git
```

Go to the project directory

```bash
    cd vuejs-tailwind
```

Install dependencies

```bash
    npm install
```

Start the app

```bash
    npm run serve
```

## Notes

Make sure the Rest API is running on http://127.0.0.1:8000.  
Start the app and go to page Register (/register) to register a new user.  
Go to page login to login the newly registered user.  
You will be redirected to list blog (/blogs), try to create a blog (/blogs/add).  
You can like or dislike a blog by clicking like or dislike button.  
You can like or dislike a comment by clicking like or dislike icon.  
You can edit and delete your own blog and comments.  
