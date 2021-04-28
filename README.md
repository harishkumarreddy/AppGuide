# AppGuide
Simple and lightweight, Zero programming documentation system.

## Instructions
1. Page creation / Edit existed
2. Left Nav
3. User Creation
4. Deployment

### 1. Page creation / Edit existed
#### *Page creation:*
Create a HTML file in pages directory then write html view. 

#### *Edit existed:*
Open specific HTML file from pages folder and update with new content.

---


### 2. Left Nav
Left side nav of the application is main navigator. Strecture of this navbar is definded in ***sidemenu.json***. we should modify this file to add new rout or update existed.

#### *Note:-*  ***sidemenu.json*** is base source for search engen in the app.

*File Structor:*
    
    [
        {
            "label": "Get Started",
            "icon": "fa-dashboard",
            "tooltip": "Get start now",
            "url": "getstarted",
            "target": "/pages/getstarted.html",
            "is_default": true
        },
        {
            "label": "Users",
            "icon": "fa-users",
            "tooltip": "User related info",
            "url": "#",
            "submenu": [{
                    "label": "Create User",
                    "icon": "fa-user",
                    "tooltip": "Create a new user",
                    "url": "newuser",
                    "target": "/pages/newuser.html"
                },
                {
                    "label": "Login",
                    "icon": "fa-key",
                    "tooltip": "User login",
                    "url": "login",
                    "target": "/pages/login.html"
                }
            ]
        }
    ]
    
---



### 3. User Creation

We dont have RBMS in this small static application. But, for simple authentication, we have implimented alternative way to login without DB. As per this, Simply we can create an user file under users directory. the file name should follow the standerd patren like ***username.user***(***.user*** is the extention to tell that it is an user file of the application). The file will contain Password and User full name supperated by "|"(pipe).

*EX: Userfile for the user `Test User` is "user1.user"*

    The content of the file: 
    password|Test User

Here is the user info with this filename, 
```
Username: user1
password: password
FullName: Test User
```

---



### 4. Deplyment
As it is a static page, we can directly place all projrct files under server public rout. 

---
@author: [Harishkumar](https://www.linkedin.com/in/harishkumar-reddy-ch-93b85a131)
