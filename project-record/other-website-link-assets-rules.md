# Rules to follow when cloning other website functionality, or using their assets (like image, video etc), or they have shown some url/text which represent their website

- When cloning some other website feature functionality, first finalize the below mentioned steps
  - finalize the name of features (mean what we will name a feature in our project)
    - e.g: we cloned the switchy.io "smartpages" feature, but in our project we called it "link-in-bios" so discuss this before adding hard-coded text in code or defining urls etc.
- When using other website assets

  - until our designer creates assets for zaions, and we need to show something on our uri, just for time been you can use other website assets but need to follow below mentioned rules
    - if it's a image/git/svg/art etc
      - download that and either include that in our project as build asset or just upload that to zaions server, or some dedicated zaions google drive (create a new google account and only use that for zaions work, to keep it clean) and use that link.
        - do not add each and every asset (type defined above) in project as build asset as this increases the project size.
        - try and upload that as defined above and then use that.
    - if it's a video assets
      - same either upload to zaions server, or simply upload to youtube channel (create one google account as mentioned account and create a youtube channel for work uploads).
        - make sure to keep the video uploaded on youtube to "unlisted", not private or public.

- if find some hard-coded text/url which indicates the website from where we are cloning the functionality.

  - if it's a generic link like (privacy policy, terms, contact us, etc), then just create a constant in constants file about "ZaionsBusinessDetails" (as object) add that key, which will hold the respective detail (e.g: ContactUsUrl: "https://zaions.com/contact-us") and use that where ever needed, make sure to do not hard code such detail, as it will make the changing/updating process difficult.
  - if it's some non generic content, either if possible for you create a relevant replacement for "Zaions" or current project if that how it should be.
    - but if you can not understand what should be done for some text/url/etc then just discuss that will your senior.

- Never ever
  - use direct url to any asset type which is hosted on other website (the website from where we were trying to clone a feature)
    - it does not include, our own youtube, google drive, other file/asset hosting websites accounts urls.
      - even for youtube, etc it has to be our own account, otherwise discuss before you point to some asset which we do not own.
        - or write a full reason (explanation why it was done like that.)
  - add hard coded text/url/route etc, always create a constant/variable for a link/text which
    - points to other website (we should never point to any other website, but if we do, make sure to add reason (and discuss that with senior as well) with rel="nofollow", and target="\_blank").
