# WOVEN FINANCE BACKEND TASK

💫 Welcome! 🎉
This backend exercise involves building a Node.js/Express.js app that will serve a REST API. We imagine you should spend around 3 days at implement this feature.


## Data Models
>  Create all models in the src/models folder

### Profile
A profile can be either a `client` or a `contractor` 
Clients create contracts with contractors.
Contractor does jobs for clients and get paid.

Each profile has a balance property.

### Contract
A contract between and client and a contractor.
Contracts have 3 statuses, `new`, `in_progress`, `terminated`. contracts are considered active only when in status `in_progress`

Contracts group jobs within them.

### Job
Contractor get paid for jobs by clients under a certain contract.

## Technical Notes

- The database provider is MySQL. Please use Sequelize as your ORM and ensure you create seeders for easy testing.

- To authenticate users create a `getProfile` middleware that is located under src/middleware/getProfile.js. users are authenticated by passing `profile_id` in the request header. after a user is authenticated his profile will be available under `req.user`. Make sure only users that are on the contract can access their contracts.

## APIs To Implement
Below is a list of the required API's for the application.
1.  ***GET***  `/contracts/:id` - It should return the contract only if it belongs to the profile calling
1.  ***GET***  `/contracts` - Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.
1.  ***GET***  `/jobs/unpaid` - Get all unpaid jobs for a user (***either*** a client or contractor), for ***active contracts only***.
1.  ***POST***  `/jobs/:job_id/pay` - Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.
1.  ***POST***  `/balances/deposit/:userId` - Deposits money into the the the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)
1.  ***GET***  `/admin/best-profession?start=<date>&end=<date>` - Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.
1.  ***GET***  `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` - returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.



## Going Above and Beyond the Requirements
Given the time expectations of this exercise, we don't expect anyone to submit anything super fancy, but if you find yourself with extra time, any extra credit item(s) that showcase your unique strengths would be awesome! 🙌

It would be great for example if you'd write some unit test 

## Submitting the Assignment
When you have finished the assignment, create a github repository and send us the link.
Thank you and good luck! 🙏
