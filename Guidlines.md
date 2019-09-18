# SDC Project Milestones

## Phase 0: Picking a project and initial setup

### Choosing a FEC project

- Your team must choose an FEC project to extend and build upon
- Each SDC team member must choose one FEC module/service (repo) to work with. This selection must be unique and there is a 1:1 mapping from FEC services to SDC services (i.e. one person will own one service, the team will own the entire "app".
- Like FEC, each member of the SDC team must also work with a proxy server. Members of the team are free to choose from any of the FEC project's proxy servers (it is possible for all members of the SDC team to choose the same proxy server; there is no uniqueness requirement).
  - It is recommended to choose a proxy server that supports server-side rendering while also having a relatively simple implementation. Already having the server-side rendering feature is **not** a requirement -- choosing an overly complex proxy (one that attempts to do more than what is essential) will slow down your ability to progress through the SDC requirements.
  - It's best to choose a simpler proxy and add basic server-side rendering yourself at the appropriate time (read more in the "Stress-testing your Proxy" section below).

### Initial Repo Setup

- [x] For the team, create a new [GitHub Organization account](https://help.github.com/articles/creating-a-new-organization-account).
- [x] Add all your team-mates as members to the new org.
- Each member of the team should:
  - [x] Create a new Repo in your new organization for your service.
  - [x] Clone the FEC repo for the service of choice to your laptop.
  - [x] Remove the original origin `git remote rm origin`
  - [x] Add your new repo as the remote `git remote add origin https://github.com/[your org]/[your repo]`
  - [x] Push the cloned repo to your organization. `git push origin master`
  - [x] Make an empty repo for your proxy server.
    - [x] Copy the FEC repo for the proxy of choice to this repo. (This way, multiple team members can use the same initial proxy code).
- [x] Every team member must configure Trello as their ticket management system, with a sprint-based setup.
- [x] File your first tickets in Trello as investigative/design tickets.
  - Don't do any work that isn't ticketed. Capture everything that you're doing, all your work, in the form of a Trello ticket.

## Phase 1: Scale the Database

### Support CRUD from your API

- Extend the existing API to support all CRUD operations. This should be done with the inherited DBMS:
  - Create / POST - create a new item
  - Read / GET - read an item
  - Update / PUT - update an item
  - Delete / DELETE - delete an item
  - Be sure to select the appropriate routes for each of these actions so they conform to the REST standard.

### DBMS Selection and Data Generation

- [x] Select two DBMS technologies that were not used by you or by your inhereited service in FEC (preferably a RDBMS and a NoSQL DBMS)
  - Think carefully about the use-cases for your service and design a schema that is *realistic* for what your service is doing. It's likely that your service is the source of truth for certain information so be sure to represent your information in a way that accomplishes the goals of your use-cases.
  - Database options:
    - SQL: Postgres, MySQL, MariaDB
    - NoSQL: Cassandra, Mongo, Riak
    - Graph: Neo4j (not applicable for all datasets)
    - OUT OF BOUNDS: in-memory databases, such as Redis
    - NOTE: ask your TM for permission before selecting a DBMS not on this list
- [x] Write a data generation script that can produce a minimum of 10M records and efficiently load this data into your service's DBMS. **Use your simulated dataset for ALL subsequent testing**.
  - Ideally, data generation+loading should take no more than 1hr for 10M records. For many projects, the total time should be under 10 min.
  - Records should be representative of actual data. The use of libraries and tools like Faker, Lorem Ipsum (text) and Lorem Flickr (images) is recommended.
  - You must generate your own data -- using a downloaded dataset or scraping data from a website is **not permitted**.
  - Attempt to design and build a modular data generation and import script. More specifically, design the data generation step to be independent of the load step. This will allow you to use the same generation code for both databases.
  - The primary record represents an item. If your service/widget is responsible for related data, you will likely generate more than 10M records. For example, there is a 1:1 relationship between an item and its description, but there is a 1:n relationship between an item and it's reviews/photos/etc.
  - The number of related records should vary between items; the goal is to create a realistic representation of an item page. For example, not every item will have 10 reviews or 10 photos. Some items will have zero reviews, some will have 20. Create variations as appropriate.
  - If you are working on a media-centric widget:
    - **DO NOT SERVE YOUR MEDIA ASSETS FROM EXPRESS**. Instead, transfer your media assets to S3 and/or Cloudfront. Be sure the URLs in your database correctly refer to the location of your assets.
    - **DO NOT GENERATE 10M IMAGES**. Instead map the 10M URLs in your database to one of approx 1000 real images. Remember, stressing the database is your goal here, not generating 10M unique images.

### DBMS Benchmarking

- [ ] Verify that all queries used by your API will run in under 50ms. To achieve this goal, you may need to do some performance tuning work on your DBMS.
  - Confirm performance by running the queries used by your API either by:
    - Writing tests (using/modifying existing tests is ok)
    - Using the DB console to execute and time queries
  - Notes:
    - Craft your queries to use records that are within the last 10% of your dataset.
    - Your queries should be the same queries you would use to support your API. Benchmarking a query that your service wouldn't use isn't helpful to determining performance.
    - Queries will be different depending on the technology in use.
    - 50ms is the upper limit. Most queries for this project should be optimizable to around 10ms or less. While most queries for this project can be optimized to execute in significantly less than 50ms, there may be very legitimate reasons why this goal might not be reachable in your circumstance.
- [ ] Compare the performance of these two systems against each other and pick the one that performs best for *your* use-case.
- [ ] Select one of your DBMS options for your final implementation
  - Once you have made a final decision on DBMS:
    - Update your API server to use that Database
    - Verify your UI still works as expected

## Phase 2: Measure Initial Performance

- [ ] Install New Relic on your service and proxy to report metrics about your servers' performance to the New Relic dashboard. At minimum, you must monitor response time (aka latency), throughput, and error rate -- these are the default metrics reported by New Relic. Other metrics may be useful to your specific application but are not required.
  - **Caution: New Relic has a 14-day free trial**. Do not start your New Relic trial in the first week of the project or you will run out of time! (If you run out of time, you can sign up for a 2nd account with a different email address.)
- [ ] Stress-test Your Service:
  - [ ] Stress test your service in development (on your laptop), in isolation from other services, using the simulated data you created and realistic requests to your service's API by scaling the number of request per second: 1, 10, 100, 1K.
    - Your ability to reach 1K RPS on your laptop will vary by choice of technology and laptop speed and you may not be able to reach this level of performance. If in doubt, ask your TM.
    - Stress test the GET route and the POST route. Measure RPS, latency, and error rate for each type of request.
    - _Stress test tools in development (laptop): Httperf, Jmeter, K6 or Artillery_
- [ ] Stress test your proxy server in development (on your laptop). Turn off all other services except your own. Scale the number of request per second: 1, 10, 100, 1K

## Phase 3: Deploy the Service and Proxy

### DBMS Server Deployment

- [ ] Run your database in an EC2 instance and populate it with 10M+ records as you did locally. Once the rest of your system is deployed, you should connect to and use this EC2 instance to persist your data.
  - Do _not_ use RDS or other hosted DBMS solutions!
  - _Caution_: the free tier for EC2 includes 750 hours of EC2 compute time per month. Be aware of how many instances you are using and how long you run them. You are only charged for running instances. If you are running three (3) t2.micro instances, you can run them for 250 hours (750/3) before you accrue a billing charge. The EC2 dashboard will tell you what the running status is for each of your servers.
  - You should expect to use multiple EC2 instances: at least one for your service, one for your proxy and one for your DBMS
  - **\*\*You may use EC2 instances that are larger than t2.micro; however, you must obtain permission first and you must be prepared to spend $$$**.
    - If you choose Cassandra, it is very likely that will need to use a larger instance

- [ ] Make sure to add any files with sensitive information (like AWS keys or database passwords) to your [.gitignore](https://git-scm.com/docs/gitignore). Be very careful to not commit or push sensitive credentials. Malevolent actors are scraping github for these kind of keys and will use them to run AWS services under your account and *you will be billed for it*!
**DO NOT PUBLISH KEYS AND OTHER SENSITIVE DATA TO GIT!**

- Deploy the service and proxy to raw EC2 instances (t2.micro instances only!)
- Optional: If needed, you may make use of the following additional AWS services:
  - S3
  - Cloudfront
  - SQS and SNS
  - Lambda
  - Caution: billing charges for above services vary and limits apply for the free tier
  - **OUT OF BOUNDS**: Do not use any other AWS services without permission (ex: RDS or Elastic Beanstalk).
- Optional: Containerize your service and proxy prior to deployment using Docker.

The service you took over from the FEC phase may already be using one or more out-of-bounds AWS services. If this is the case, you must undo this and manually configure EC2 instances per above requirement, using either the relevant instance types or a generic instances with using the appropriate Linux commands.

- [ ] Stress test your deployed service on EC2 in the same way (in isolation by scaling RPS from 1 to 1K in 10x increments) - The minimum requirement for EC2 is 100 RPS with an error rate of less than 1% and latency of less than 2000ms.
    - DO NOT stress test your AWS instance using your laptop. You must use a cloud-based tool, such as [loader.io](https://loader.io/).
- [ ] Stress-test Your Proxy:
    - Stress test the GET route and the POST route. Measure RPS for each type of request.
  - [ ] Once your entire team has deployed their services to AWS, stress test your deployed proxy. The minimum requirement for EC2 is 100 RPS with an error rate of less than 1% and latency of less than 2000ms.
    - DO NOT stress test your AWS instance using your laptop. You must use a cloud-based tool, such as loader.io.

## Phase 4: Scale the Service and Proxy

This is the fun part! Now that you have a functioning DBMS and deployed Service and Proxy apps, individually test your service and proxy at scale (up to 10K requests per second) while making performance improvements in an attempt to support this level of load.

Get creative with vertical and horizontal scaling strategies including, _but not limited to_:

- [ ] If your proxy server does not yet support server-side rendering (SSR), refactor your proxy server to server-side render all React components from their respective services.
  - Do not use frameworks such as nextjs for SSR -- it's important to understand what SSR is before using a "magical framework" like nextjs.
  - This may require some coordination by the team and minor adjustments to how state is communicated to each service.
  - For the basic requirements of this project, it is not necessary or recommended for your proxy to deliver a fully-interactive web page to the client (i.e. the react components will render down to HTML on the server and the proxy will deliver static HTML content to the client).
- [ ] Configure load balancing strategies
- [ ] Setup caching systems and CDNs if necessary
- [ ] Run Google Page Speed against your proxy server and implement the recommended improvements.

During this phase, you will also run into integration issues as teammates publish changes to their services. Take time to address these problems as a team, as they arise.

### Notes:

- Stress-testing will uncover performance issues and will force you to contend with these bottlenecks and engage in optimization work. There is so much great work to be done here! Remember to take notes and screen-shot graphs from New Relic.

- You probably will not exceed more than 200 RPS with a single t2.micro EC2 instance. This is when you should consider horizontal scaling.

- Stress testing requires that all 10M+ records be loaded into your service's database and all services used by your proxy have their 10M records loaded too. You will query records that are distributed throughout your dataset (random-ish) _but you should bias your selection (prefer) records that are within the last 10% of your dataset_.

- Stress testing is not intended to measure page fully rendered state; i.e. if working on a media widget, you do not measure load times of your media. When your page is fully rendered on the server, loading of HTML+CSS is sufficient for a request to be considered complete (time to first render).

- **When stress-testing, it's important to create a realistic scenario.** The number of concurrent users is important, as is the ratio of total requests to concurrent users (think about how many requests you could personally generate per second using your mouse and web browser -- not many). Additionally, these concurrent users should not all be requesting the same page.

- You will encounter very different challenges when stress testing on EC2 than on your laptop. Attempt to reach 1K as best you can with a reasonable latency and error rate (you may not reach that goal on EC2). You'll need to think about this problem carefully and make use of multiple techniques and strategies to reach the goal. At minimum, your goal is to handle at least 100 RPS on EC2 with low latency (< 2000 ms) and low error rate (<1%).

- Logging: logging offers important details about the performance of your app that tools like New Relic do not offer. It's important that you do not eliminate logging as a way to improve your RPS numbers. Instead, consider ways to only log important information or minimize the effects of logging on the performance of your servers.

- Database benchmarking and stress-testing are two of the most important technical requirements of this project. These exercises will arm you with engineering "war stories" that you will use during the job interview process. Every team member is expected to do this work on their own service and their proxy server as a basic requirement of this project.

## Phase 5: Final Conversations

Deliver an in-person conversational-style presentation about what you worked on. Pick your toughest challenges. Speak about the problem quantitatively, what you discovered, how you addressed it, and how much improvement you made.

More directions are [available here](./final_conversations.md).
