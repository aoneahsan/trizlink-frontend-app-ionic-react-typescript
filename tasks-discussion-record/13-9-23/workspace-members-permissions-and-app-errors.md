# explaining talha - members permissions management in trizlink and any other product frontend and backend Part1

<https://www.awesomescreenshot.com/video/20731911?key=9af48709e386bf5f5fb7581f23df924f>

explaining talha - members permissions management in trizlink and any other product frontend and backend Part2:
<https://www.awesomescreenshot.com/video/20735649?key=2d14df0ee71b9a7a369514841d04d52a>

———— Errors in current app —————

- ~~user is not logged in (add invalid auth data in localstorage and try going to sign in page) will see the errors~~
- <http://localhost:5173/#/#/#?#> (should redirect to 404, but not redirecting, instead showing home page)
- ~~notification and profile setting right now goes to nothing, no page for these two right now~~
- ~~nothing is working in “setting -> workspace settings” pixel/utm tags/etc links~~
- ~~this settings page responsiveness is shit~~
- ~~nothing for user setting still/so-far in our app~~
- ~~empty tables/lists on mobiles/tablets/desktops~~
- 404 page cases still not completed in app. (<http://localhost:5173/app/workspaces/6501bcb41550c/settings/as/team/asd/ds/asd>)
- 404 page shows two times, the 404 page component
- ~~<http://localhost:5173/app>. this should redirect to workspace page, and should not show a 404~~
- ~~no invite button added on “teams list table”~~
- ~~team description mentioned 300 characters, on input counter, in error saying 250 charactors, and when tried submitting a single long word gave error~~
- ~~all alerts/notifications/toasts/sidebar-notifications text should be stored in a single file (or in multiple files in side a single folder) and should be used from there~~,
- ~~and second point about notifications, all notifications and static text in our should be generated from chatgpt4 with a proper professional (healthy funny humar) use chatgpt3 incase you do not have access to 4, we will change these text once we are near to production release~~
- ~~invitee rejected the invitation, no message/notification to the invitor user~~
- ~~"Invited accepted at” change this to “Updated At”. (value will be “Invite Accepted/Rejected at {time}”~~
- new notification should be on top, not in bottom
- ~~pull and refresh not working on any page (workspaces page tested)~~
- ~~i send a invite and then was able to send an other invite to same user~~
- one notification appeared, then second appeared after it (mean in bottom, should appear on top),. and then last one appeared in between both :|
- workspace invite notification, should have a button “view”, when click on it, should redirect user to workspaces page (if he is on some other page) and should refetch the data of invitations
- ~~showing “mark as faviort for workspace invitations, total invalid case, user needs to accept invite first then only can mark as faviorte~~
- ~~i marked a workspace invitation as faviorte and then tried accepting it from favoritte list, gave a error, and then i accepted the invitation from “shared workspaces list” it worked and it removed my workspace from the favorite workspace list automatically~~

~~show timer in otp in signup, forget password pages~~
~~show alert before logout~~

—— Permissions Flow in Shared WorkSpaces. —————

- no other option on shared workspaces, only two options “view” & “leave”
- /app/s/ws/{wsId}/startup.
  - - fetching data on this page, so user can see what he can do
      - - - queries we will fetch on this page
            - - - - permissions of this user in this workspace, shortlinks, link in bios, posts
- after fetching permissions and other (as mimium as possible) data move user to /app/s/ws/{wsId}/view
  - - total 4 sections, one for workspace info, one for shortlinks, one for link in bio, one for posts.
      - - - total number of {shortlinks/bios/posts} in their section

$wsTeamMember = WSTeamMember
$roleId = $wsTeamMember->mem

$role = Role::

$roles->permissions()

wsView\_
return [

]

will continue about atom family to store workspace permissions for all workspaces and then update the can component, it will accept a workspace id so it knows where it needs to check these permissions.
