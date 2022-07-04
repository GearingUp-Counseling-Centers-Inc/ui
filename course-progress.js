
    // change background and text color based on module open
    function changeColor(colorId) {
      const bodyBG = document.documentElement;
      if (colorId == 'purple') {
        bodyBG.style.setProperty('--bg-color', '#B39BBB');
        bodyBG.style.setProperty('--text-color', '#492855');
      } else if (colorId == 'blue') {
        bodyBG.style.setProperty('--bg-color', '#95CDE4');
        bodyBG.style.setProperty('--text-color', '#183C4B');
      } else if (colorId == 'green') {
        bodyBG.style.setProperty('--bg-color', '#BDDCC8');
        bodyBG.style.setProperty('--text-color', '#184B46');
      }
    }
    
    // show all modules of this course
    const tokenId = localStorage.getItem('TokenID');
    const userId = localStorage.getItem('UserID');
    const courseId = '6R2X9jzBrXy8NZuxYm6f';
    const url = `https://us-central1-gearingup-education-platform.cloudfunctions.net/api/get-course?courseId=${courseId}&userId=${userId}`;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenId}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then((text) => {
          throw new Error(text);
        });
      })
      .then((json) => {
        const course = json;
        let sectionNumber = 1;
        for (const milestone of course) {
          const chapters = document.createElement('div');
          const progressWrapper = document.createElement('div');
          let completed = false;
          for (const chapter of milestone.chapters) {
            const chapterWrapper = document.createElement('div');
            const progressItem = document.createElement('div');
    
            // check if each chapter was completed
            let completedSvg;
            for (const video of chapter.videos) {
              if (video.watched == false) {
                completedSvg = 'absolute-embed-icon hidden';
                progressItem.className = 'progress-bar';
                completed = false;
              } else {
                completedSvg = 'absolute-embed-icon';
                progressItem.className = 'progress-bar active';
                completed = true;
              }
            }
    
            chapterWrapper.innerHTML = `<div class="chapter-wrapper">
                 <div class="chapter-name">
                   <div class="status-circle">
                     <div class="circle-icon">
                       <svg width="100%" height="100%" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M17 33C25.8366 33 33 25.8366 33 17C33 8.16344 25.8366 1 17 1C8.16344 1 1 8.16344 1 17C1 25.8366 8.16344 33 17 33Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                       </svg>
                     </div>
                     <div class="${completedSvg}">
                       <svg width="100%" height="100%" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M1.34399 7L5.34399 11L15.344 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                       </svg>
                     </div>
                   </div>
                   <div class="chapter-header">${chapter.title}</div>
                 </div>
                 <a href="#" class="primary-button hidden w-inline-block"><div>Resume</div></a>
               </div>`;
    
            chapters.appendChild(chapterWrapper);
            progressWrapper.appendChild(progressItem);
          }
    
          // check if all chapters were completed in the milestone
          let milestoneClass;
          if (completed == true) {
            milestoneClass = 'module-card completed';
          } else {
            milestoneClass = 'module-card';
          }
    
          const milestoneWrapper = document.createElement('div');
          milestoneWrapper.className = milestoneClass;
          milestoneWrapper.innerHTML = `
              <div class="module-card-header">
                <div class="module-card-caret">
                  <div class="w-embed">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9669 10.1427L17.5527 8.72852L11.8957 14.3856L6.23843 8.72836L4.82422 10.1426L11.8953 17.2136L11.8955 17.2134L11.8959 17.2138L18.9669 10.1427Z" fill="currentColor"></path>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9669 10.1427L17.5527 8.72852L11.8957 14.3856L6.23843 8.72836L4.82422 10.1426L11.8953 17.2136L11.8955 17.2134L11.8959 17.2138L18.9669 10.1427Z" fill="currentColor" fill-opacity="0.2"></path>
                    </svg>
                  </div>
                </div>
                <div class="module-card-status">
                  <div class="module-card-section">
                    <div class="bodyxs-medium">Section ${sectionNumber}</div>
                  </div>
                  <div class="locked">
                    <div>LOCKED</div>
                    <div class="embed-icon w-embed">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.75 9.75H5.25C4.42157 9.75 3.75 10.4216 3.75 11.25V21.75C3.75 22.5784 4.42157 23.25 5.25 23.25H18.75C19.5784 23.25 20.25 22.5784 20.25 21.75V11.25C20.25 10.4216 19.5784 9.75 18.75 9.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M6.75 9.75V6C6.75 4.60761 7.30312 3.27226 8.28769 2.28769C9.27226 1.30312 10.6076 0.75 12 0.75C13.3924 0.75 14.7277 1.30312 15.7123 2.28769C16.6969 3.27226 17.25 4.60761 17.25 6V9.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M12 15V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                     </svg>
                   </div>
                 </div>
                 <div class="complete hidden">
                   <div>COMPLETE</div>
                   <div class="embed-icon w-embed">
                     <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                       <path d="M8.75806 14.5L11.7581 17.5L19.2581 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                     </svg>
                   </div>
                 </div>
               </div>
               <div class="color-id">${milestone.color}</div>
               <div class="module-card-details">
                 <h2 class="headingxs-regular">${milestone.title}</h2>
                 <div class="progress hidden">
                   <div class="progress-text">Completed 0 / ${milestone.chapters.length}</div>
                   <div class="progress-wrapper">${progressWrapper.innerHTML}</div>
                 </div>
               </div>
             </div>
             <div class="module-card-body">
               <div class="module-card-content">${chapters.innerHTML}</div>
             </div>`;
    
          sectionNumber++;
          const mainWrapper = document.querySelector('#courseContainer');
          mainWrapper.appendChild(milestoneWrapper);
        }
        loadAccordions();
        changeCardStatus();
        changeChapterStatus();
      })
      .catch((error) => {
        console.log(error);
      });
    
// open course module animation
function loadAccordions() {
  const accordions = document.querySelectorAll('.module-card');
  const openAccordion = (accordion) => {
        const content = accordion.querySelector('.module-card-body');
        const caret = accordion.querySelector('.module-card-caret');
        caret.style.transform = 'rotate(180deg)';
        content.style.height = 'auto';
        content.style.opacity = 1;
      };
    
  const closeAccordion = (accordion) => {
        const content = accordion.querySelector('.module-card-body');
        const caret = accordion.querySelector('.module-card-caret');
        caret.style.transform = 'rotate(0deg)';
        content.style.height = '0px';
        content.style.opacity = 0;
      };
    
  accordions.forEach((accordion) => {
        const intro = accordion.querySelector('.module-card-header');
        const colorId = accordion.querySelector('.color-id');
        const content = accordion.querySelector('.module-card-body');
    
    intro.onclick = () => {
          changeColor(colorId.innerHTML);
          if (content.style.height == 'auto') {
            closeAccordion(accordion);
          } else {
            accordions.forEach((accordion) => closeAccordion(accordion));
            openAccordion(accordion);
          }
        };
      });
}
    
// change UI of the milestone if it's completed
function changeCardStatus() {
  const milestones = document.querySelectorAll('.module-card');
  const completedMilestone = Array.from(milestones).find((element) =>
        element.classList.contains('completed')
  );
  if (completedMilestone) {
        completedMilestone.querySelector('.locked').classList.add('hidden');
        completedMilestone.querySelector('.complete').classList.remove('hidden');
        if (completedMilestone != milestones[milestones.length - 1]) {
          completedMilestone.nextElementSibling.classList.add('active');
          completedMilestone.nextElementSibling
            .querySelector('.locked')
            .classList.add('hidden');
          completedMilestone.nextElementSibling
            .querySelector('.progress')
            .classList.remove('hidden');
        }
      } else {
        const firstMilestone = Array.from(milestones)[0];
        firstMilestone.classList.add('active');
        firstMilestone.querySelector('.locked').classList.add('hidden');
        firstMilestone.querySelector('.progress').classList.remove('hidden');
      }
}
    
// change UI of the chapter
function changeChapterStatus() {
  const allChapters = document.querySelectorAll('.absolute-embed-icon');
  const completedChapters = document.querySelectorAll('.progress-bar.active');
  const maxLength = allChapters.length;
  const progressLength = (completedChapters.length * 100) / maxLength;
  document.querySelector('#progressBar').style.height = `${progressLength}%`;
      const currentChapter = Array.from(allChapters).find((element) =>
    element.classList.contains('hidden')
  );
    const currentChapterParent = currentChapter.parentElement.parentElement.parentElement;
    currentChapterParent.querySelector('.primary-button.hidden').classList.remove('hidden');
}    
