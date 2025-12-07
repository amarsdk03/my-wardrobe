# myWardrobe

### A simple and quick webapp to catalog and digitally organize your clothes

> #### Visit it on: https://my-wardrobe-app.vercel.app/


## Backstory

My wardrobe is a mess, and I needed to sort and "visualize" all of my clothes in a single place, but I felt like taking and spreading each one on my bed would take me too long and also just leave a mess that I wouldn't later want to clear up.

So I did what any sane CS student would do: I spent even more time making an entire webapp just to visualize and catalogue my clothes. I did try to find an already existing solution online but didn't find anything, so I hope this can be of some use for people that have my same need.


## What you can do

### Current features

- Add a new clothing item to your wardrobe
- Modify or delete existing clothing items
- Add clothing items to a Wishlist
- Filter clothing items by category
- Change some interface aspects (grid size and color theme for now)
- Export/load your wardrobe data as a JSON file

### Future features (if I ever come back to this project)

- Ability to customize the clothing items categories
- Add an "Outfit" section to the webapp
- Add actual authentication and user management
    - Login/register
    - User profile with clothing items list
    - Ability to share clothing items with other users
    - Ability to set items/wardrobes/outfits private or public

---

## IMPORTANT: localStorage

Because I wanted to keep the webapp as simple as possible, I decided to use localStorage to store the user's data.

This means that all the website data is saved locally, so you **can end up losing everything** if you clear the cache, reset your browser or uninstall it. It is recommended you manually save a backup of your wardrobe every once in a while, which you can do by clicking the "Save as JSON" button in the Settings dialog.

Also you can share your own wardrobe with other users or devices by saving and loading the JSON file from the settings: **for this reason, only import JSONs you have previously exported or which have been shared from trusted sources. Malicious files could contain harmful data: use this feature at your own risk!**

---

## Details

### Technical details

I developed this webapp using:

- React.js
- Next.js
- Tailwind CSS
- Typescript

I built the components with shadcn, used Lucide for the icons, and the Text Pressure component from React Bits for the main homepage title. Lastly, I used Vercel to deploy the webapp online.

Everything took around 15 hours of pure code writing time + some AI assistance for various code snippets.

### Additional notes

If you want to fork and make your own version, feel free to, just remember to credit this repo somewhere.

Remember that the entire project is kind of messy, as I prioritized achieving the final product quickly rather than building something solid and mantainable. This means you'll ~~definitively~~ probably encounter bugs or just inefficient/verbose implementations around the codebase, but for what I was able to test, everything works pretty well, and that's what matters I guess.

Maybe if I have time in the future I will be able to revisit this project to refactor the codebase, fix any found bugs, and who knows maybe add some new features too (*cough outfits cough*...)

---

## Contacts

If you have any questions, suggestions, or simply want to let me know anything, feel free to send me an email to amarsdk03@gmail.com