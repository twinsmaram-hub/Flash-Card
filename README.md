# Flash Card
**Idea:** 

To develop a personalized, web-based educational platform aimed at enhancing visual and active recall by enabling users to build their own custom library of question-and-answer content supported by images.

**ERD:**


This table illustrates the database structure and the relationships between the main entities (as shown in your ERD diagram):

| Entity | Field | Type | Notes |
| :--- | :--- | :--- | :--- |
| **User** | `name` | String | Required |
| **User** | `password` | String | Required  |
| **User** | `picture` | String | Profile Image URL |
| **Flashcard** | `question` | String | Required |
| **Flashcard** | `answer` | String | Required |
| **Flashcard** | `picture` | String | Illustrative Image URL (Optional) |
| **Flashcard** | `owner` | ObjectId | Linking the flashcard to its owner |

![ERD](public/images/ERD.png)

## Basic Mockups
### SING UP
![sing up ](public/images/singup.png)

### LOG IN
![LOG IN ](public/images/LogIn.png)

### SHOW PAGE
![showpage](public/images/showpage.png)

### QUSTION CARD
![card q](public/images/cardq.png)

### ANSWER CARD
![card q](public/images/cardA.png)

### UPDATE AND DELETE CARD
![UPDATE&DELETE](public/images/UPDATE&DELETE.png)




