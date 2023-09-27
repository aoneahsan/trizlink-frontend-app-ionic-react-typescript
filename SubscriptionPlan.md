SubscriptionPlan
  id
  uniqueId
  title
  displayName
  description
  price
  discountPrice
  features  (json)
    {
      userAccount: {
        emailsAddressesAllowed: 3
      },
      workspaces: {
        activeWorkspaces: 1,         
        inActiveWorkspaces: 2,       ()
        totalWorkspaces: 3  (dynamic),     (not a field)
      },
      workspaceMembers: {
        activeMembers: 
      },
      shortLinks: {
        shortenLinksPerMonth: 100, (active)
        canEditTargetUrl: false,
        inActiveLinks: 10,
        totalLinks: 30 (dymanic),     (not a field)
        slCreatePageFeatures: {
          sad: true
        }
      }
    }


UserSubscriptionPlan
  userId
  subscriptionPlanId
  startedFrom
  validTill
  priceCharged
  transactionId


UserTransactions
  userId
  type   (subscriptionPlanTransaction)
  balanceBeforeTransaction
  balanceAfterTransaction
  transactionAmount
