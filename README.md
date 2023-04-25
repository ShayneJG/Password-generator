# Password-generator
password generator app using React w/Vite, Typescript, and tailwind

LIVE: https://shaynejg.github.io/Password-generator/

Things I've learnt: 

HTML elements can be quite difficult, if not impossible, to give custom styles using just CSS. Trying to get the slider and the checkboxes to match the design was almost impossible. I had considered creating my own components for these elements, as I have done in previous projects, but opted instead to try a library. I chose Chakra ui, and found it to be immensely helpful. This cut down on the time it took to get the elements looking right, and was easy to integrate into the work I had already done.

It was simple enough to write the logic for the generation of the passwords, but there were edge cases I had to consider. Currently, the generatepassword function will simply add one of each of the conditions (if checked), and then add the rest, then shuffle the end result. This means that the password should have at least one of each checked criteria, but also not have them all at the beginning of the password. I found a very helpful shuffle function online that was perfect for this case. 

A difficulty however was, what if the user chooses a password less than 4 letters, but ticks 4 boxes? My solution in this case was to disable the generate button on a password of less than 4 letters to avoid this issue. I chose this solution because, while it is more of a workaround than addressing the problem directly, it would also be a terrible idea to have a password of less than 4 letters, so I felt this was more appropriate and solved another issue as well. 

This project is also my first time using the new GitHub workflow/actions to publish directly to github. It is especially useful as I will often find issues/bugs that I'd like to fix, and its tedious to publish again and again to gh-pages. The workflow solution avoids that entirely and allows the live version of the site to update in close to real time. 

This project was not the hardest one by any stretch, but was good practice in following figma designs and gave me an opportunity to experiment with libraries such as Chakra UI. I will probably use this library again in future projects. 

As always, this project took way longer than anticipated, though compared to my other projects, this one was fairly fast.

Some issues that remain: 

-There is a hover effect on a checked checkbox that turns the checkbox blue. This is not part of the original design, but given that everything else is working flawlessly, and I am ready to move on from this project, I've left this in, as it does not affect user experience. I believe it comes from chakra UI's default theme. 

-The on hover effects for Chakra UI components seem to lag when used through Chromes dev tools when in mobile views. They seem to toggle on when a user clicks, and will remain there until a user interacts with another component. This seems to be an issue only in Chrome dev tools however, but could be worth following up on and testing on more mobile devices. 

-While the responsive design works exactly as intended, the checkbox sizes need to be adjusted for the desktop version of the site, as the current ones are slightly smaller than the figma design. 
