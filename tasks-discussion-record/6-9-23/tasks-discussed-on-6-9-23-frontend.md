# Hot Issues

- workspace edit page 404 error
- no way of going back to workspaces page once we click on view workspace (no button in UI for user) (done)

- ERROR: Warning: React does not recognize the `testingListSelector` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `testinglistselector` instead. If you accidentally passed it from a parent component, remove it from the DOM element.

  - workspace approver modal screen

- ERROR: Menu: must have a "content" element to listen for drag events on.

  - created a team in a new workspace and got this (some other random cases)

- Notifications modal (done)

  - move updates to first tab (done)
    - show empty component when there are no notifications (done)
    - add a refresh button next to "mark all as read" button to refetch the notifications data
      - "mark all as read" button should be disabled is there are no notifications or no notification to mark as read (done)

- invite member modal (done)

  - in mobile the UI is not correct, elements are not visible (done)
    - remove the "user icon circle" from member invite modal (done)
    - lines on left and right for "invite links ?" just one line on left and right (to make it look better) (done)

- invited members list page

  - update the format for invite at date
    - add these columns (done)
      - invite accepted at (done)
        - Action "Resend Invite link/Send a new Invite Link" (done)

- invite sent to user
  - when user click on Invite
    - successfully done, is at a bad position (for a splist second) (done)
      - email is prefilled, user should confirm that email, as a simple frontend security check
        - add a info icon on that page explaining user why we are requesting him to refill his email (done)
          - OTP email sent, but the code in that email does not look good at all, make that numbers in box, or just large numbers in one box make it beautiful any way
- password field should show errors on typing and not on focus out

- issues in link-in-bio, but that is okay, as we are working on shortlinks right now

next tasks after member flow in shared workspace

- forget password flow
  - UI and logic
- for invited user and new signup

  - show user a step to enter their username

- signup flow

  - change it like invite flow, here type will be manualSignup

- workspaces UI flow
  - favorite workspaces

<!-- My task  -->
set responsiveness of member list page.
unknown issue in invite modal when in responsive focus on email filed and whole responsive messed.

<!--  -->
first in sign up page save the data in local storage.
make workspace ui better in frontend diffrentiont the share workspace and pending workspace.
add Queues in backend where I am sending mail (small task).
