# Modeling Organizations

## Guide

<https://fusionauth.io/docs/extend/examples/modeling-organizations>

## Todo

- [x] Create Kickstart + docker files
- [x] Update kickstart to create Entities Type
- [x] Create Entity
- [x] Create and link multiple entities
- [x] Create a basic project with express + hbs
  - [x] Add logic for getting grants after login
  - [x] Add in style sheet from getting started guide
  - [x] Add login page
  - [x] Add Select Company page
- [x] Styles
  - [x] Size for company logo
  - [x] Sidebar link icons
  - [x] Clean up stylesheet
  - [x] Styling for table data
  - [x] Update "Changebank" logo on FusionAuth signin to be AwesomeCRM (or whatever the company name is)
- [x] Functionality
  - [x] Add Admin page
    - [x] Update to use attributes from FusionAuth entities
    - [x] Fix hbs input names
    - [x] Styling for input fields on form (add labels etc)
    - [ ] Update kickstarter to use "street" instead on "line1"
  - [x] Add user management page
  - [x] Logout link to point to FusionAuth logout (check logout link in FA is pointing back to the app)
  - [x] Add POST routes for: 
    - [x] Users Permissions
    - [x] User Grants (kinda just works with permissions)
    - [x] Billing
    - [x] Sales
    - [x] Reports
    - [x] Admins
  - [x] Update how pdfs are secured and downloaded. 
    - [x] Mockup pdf reports
  - [x] Update all pages to use entityId instead of names
      - [x] Update data files to use EntityId instead of names
      - [x] Update report folders to use EntityId instead of names
      - [x] Test updates
        - [x] Update code / names for company logos
        - [x] Update grant loading to be dynamic (so company name changes etc update properly)


- [x] Kickstart updates
  - [x] Add URL for profile picture
  - [x] Add other users 
  - [x] Add profile pics to github and reference from there
  - [x] Try rebuild docker and check users / images / changes.
  - [x] Add data / addresses to kickstarter entities 
    - [x] rebuild

- [x] Add readme file to codebase