    //show all modules of this course
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = "6R2X9jzBrXy8NZuxYm6f";
    const milestoneId = urlParams.get("milestone");
    const chapterId = urlParams.get("chapter");
    let videoId;
    const url =
        `https://us-central1-gearingup-education-platform.cloudfunctions.net/api/get-milestone?courseId=${courseId}&milestoneId=${milestoneId}`;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.getIdToken().then(function (idToken) {
                //req to the server
                fetch(url, {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${idToken}`,
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
                        const milestone = json;
                        const chapter = milestone.chapters.find(
                            (item) => item.id == chapterId
                        );
                        const currentChapterIndex = milestone.chapters.indexOf(chapter);
                        const nextChapter = milestone.chapters[currentChapterIndex + 1];
                        const homeworks = chapter.homeworks
                        const homeworkTitles = document.querySelectorAll(".homework")
                        const homeworkLinks = document.querySelectorAll(".homework-card")
                        homeworkLinks.forEach((elementLink, index) => (elementLink.href = homeworks[
                            index].url))
                        homeworkTitles.forEach((el, index) => (el.innerHTML = homeworks[index]
                            .title))
                        document.querySelector("#nextChapterName").innerHTML =
                            nextChapter.title;
                        //document.querySelector("#nextChapterNameMobile").innerHTML =
                        //nextChapter.title;
                        document
                            .querySelectorAll(".next-video-card")
                            .forEach(
                                (x) =>
                                (x.href =
                                    `/course?milestone=${milestone.id}&chapter=${nextChapter.id}`)
                            );
                        document.querySelector("#milestoneName").innerHTML =
                            milestone.title;
                        document.querySelector("#milestoneNameOverlay").innerHTML =
                            milestone.title;
                        document.querySelector("#chapterName").innerHTML = chapter.title;
                        const videos = chapter.videos;

                        let progressNum = 0;
                        const videoCardsWrapper = document.createElement("div");
                        for (let video of videos) {
                            videoId = video.vimeo_id;
                            let watchedState;
                            let cardDetails;
                            const progressItem = document.createElement("div");
                            if (video.watched == true) {
                                watchedState = "complete";
                                cardDetails = "video-card-details completed";
                                progressItem.className = "progress-bar active-white";
                                progressNum++;
                            } else {
                                watchedState = "complete hidden";
                                cardDetails = "video-card-details";
                                progressItem.className = "progress-bar";
                            }
                            const progressWrapper =
                                document.querySelector("#progressWrapper");
                            progressWrapper.appendChild(progressItem);
                            const videoCard = document.createElement("div");
                            videoCard.className = "video-card";
                            videoCard.innerHTML = `<div class="quiz-id">${video.quiz_id}</div>
                 <div class="video-id">${video.vimeo_id}</div>
                  <div class="video-name">${video.title}</div>
                  <div class="video-card-content" onclick="changeCurrent(this)">
                    <div class="video-thumbnail-wrapper">
                       <div class="thumbnail-embed w-embed">
                         <img style="width:100%; height:100%; object-fit:cover" src="https://vumbnail.com/${video.vimeo_id}.jpg" alt="Vimeo Thumbnail"></div>
                       </div>
                       <div class="${cardDetails}">
                         <div class="video-card-header">
                           <h2 class="headingxs-regular">${video.title}</h2>
                           <div class="spacer-16px"></div>
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
                           <div class="unlocked hidden">
                             <div>UNLOCKED</div>
                             <div class="embed-icon w-embed">
                               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M0.75 9.75V6C0.75 4.60761 1.30312 3.27226 2.28769 2.28769C3.27226 1.30312 4.60761 0.75 6 0.75C7.39239 0.75 8.72774 1.30312 9.71231 2.28769C10.6969 3.27226 11.25 4.60761 11.25 6V9.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                 <path d="M21.75 9.75H8.25C7.42157 9.75 6.75 10.4216 6.75 11.25V21.75C6.75 22.5784 7.42157 23.25 8.25 23.25H21.75C22.5784 23.25 23.25 22.5784 23.25 21.75V11.25C23.25 10.4216 22.5784 9.75 21.75 9.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                 <path d="M15 15V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                               </svg>
                             </div>
                           </div>
                           <div class="current hidden">
                             <div>CURRENT</div>
                             <div class="embed-icon w-embed">
                               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M2.33789 3.25502V20.745C2.33787 21.0044 2.40508 21.2593 2.53298 21.4849C2.66087 21.7105 2.84507 21.8991 3.0676 22.0323C3.29014 22.1654 3.5434 22.2387 3.80266 22.2447C4.06193 22.2508 4.31835 22.1896 4.54689 22.067L20.8699 13.322C21.109 13.1938 21.3089 13.0032 21.4482 12.7704C21.5876 12.5376 21.6611 12.2713 21.6611 12C21.6611 11.7287 21.5876 11.4625 21.4482 11.2297C21.3089 10.9969 21.109 10.8062 20.8699 10.678L4.54689 1.93302C4.31835 1.81044 4.06193 1.74921 3.80266 1.7553C3.5434 1.76139 3.29014 1.83459 3.0676 1.96777C2.84507 2.10095 2.66087 2.28955 2.53298 2.51516C2.40508 2.74077 2.33787 2.99568 2.33789 3.25502V3.25502Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                               </svg>
                             </div>
                           </div>
                           <div class="${watchedState}">
                             <div>COMPLETE</div>
                             <div class="embed-icon w-embed">
                               <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                 <path d="M8.75806 14.5L11.7581 17.5L19.2581 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                               </svg>
                             </div>
                           </div>
                         </div>
                         <div class="video-card-time">
                           <div class="bodyxs-light">4</div>
                           <div class="bodyxs-light">&nbsp;mins</div>
                         </div>
                         <div class="bodyxs-light">Psychological research has shown that once you’ve experienced clinical depression even once, your likelihood of relapsing back into clinical depression.</div>
                       </div>
                     </div>
                   </div>
                   <div class="video-block"></div>`;

                            videoCardsWrapper.appendChild(videoCard);
                        }
                        //inherit the milestone color
                        changeColor(milestone.color);
                        //add videos to the page and change the progress bar
                        const mainWrapper = document.querySelector("#videos-wrapper");
                        mainWrapper.appendChild(videoCardsWrapper);
                        document.querySelector(
                            "#progressText"
                        ).innerHTML = `Completed ${progressNum} / ${videos.length}`;
                        cardsState();
                        currentOnLoad();
                    })
                    .catch(function (error) {
                        if (error.status === 401) {
                            window.location.replace("/log-in");
                        }
                    });
            });
        } else {
            window.location.replace("/log-in");
        }
    });

    //change background and text color based on module open
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
    };

    //change the current video
    function changeCurrent(el) {
        document.querySelectorAll('.current').forEach(x => x.classList.add('hidden'));
        const currentId = el.parentElement.querySelector('.video-id').innerHTML;
        const mainVideo = document.querySelector('#main-video');
        const mainVideoThumbnail = document.querySelector('#main-video-thumbnail');
        mainVideoThumbnail.src = `https://player.vimeo.com/video/${currentId}?background=1`;
        mainVideo.src = `https://player.vimeo.com/video/${currentId}?h=d88fdd7efa?&playsinline=0`;
        const header = document.querySelector('#videoName');
        const overlayHeader = document.querySelector('#videoOverlayName');
        header.innerHTML = el.parentElement.querySelector('.video-name').innerHTML;
        overlayHeader.innerHTML = el.parentElement.querySelector('.video-name').innerHTML;
        el.querySelector('.current').classList.remove('hidden');
        const quizId = el.parentElement.querySelector('.quiz-id').innerHTML;
        cardsState();
        getQuiz(currentId);
    };


    function getQuiz(vimeoId) {
        //get the quizzes from the db
        const url =
            `https://us-central1-gearingup-education-platform.cloudfunctions.net/api/get-quiz?vimeoId=${vimeoId}&courseId=${courseId}`;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken().then((idToken) => {
                    fetch(url, {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${idToken}`,
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
                            const quizString = JSON.stringify(json);
                            const quizStringOld = quizString.replace(/-/g, '_');
                            const quiz = JSON.parse(quizStringOld);
                            const quizWrapper = document.querySelector('#quizForm');
                            if (quiz.question_1) {
                                const question1 = document.createElement('div');
                                question1.className = 'question is--current-question';
                                question1.innerHTML =
                                    ` <div class="bodyl-regular bottom-margin-64px">
                    Answer this question to quickly review some of the material from the video.
                  </div>
                  <div class="question-number">
                    <div class="question-text-number">1</div>
                    <div>/</div>
                    <div class="total-questions">1</div>
                  </div>
                 <div id="quizQuestion" class="headingm-regular bottom-margin-32px">
                   ${quiz.question_1}
                 </div>`;
                                quizWrapper.appendChild(question1);
                                const question1Answers = document.createElement('div');
                                question1Answers.className = 'answer-options';
                                question1.appendChild(question1Answers);

                                if (quiz.answer_1_1) {
                                    const answer11 = document.createElement('a');
                                    answer11.className = 'quiz-link w-inline-block';
                                    answer11.innerHTML =
                                        `<div class="quiz-pill">
                   <div class="quiz-embed w-embed">
                     <div class="${quiz.answer_1_1_value}"></div>
                   </div>
                 </div>
                 <div class="quiz-text">${quiz.answer_1_1}</div>`;
                                    question1Answers.appendChild(answer11);
                                }

                                if (quiz.answer_1_2) {
                                    const answer12 = document.createElement('a');
                                    answer12.className = 'quiz-link w-inline-block';
                                    answer12.innerHTML =
                                        `<div class="quiz-pill">
                   <div class="quiz-embed w-embed">
                     <div class="${quiz.answer_1_2_value}"></div>
                   </div>
                 </div>
                 <div class="quiz-text">${quiz.answer_1_2}</div>`;
                                    question1Answers.appendChild(answer12);
                                }

                                if (quiz.answer_1_3) {
                                    const answer13 = document.createElement('a');
                                    answer13.className = 'quiz-link w-inline-block';
                                    answer13.innerHTML =
                                        `<div class="quiz-pill">
                   <div class="quiz-embed w-embed">
                     <div class="${quiz.answer_1_3_value}"></div>
                   </div>
                 </div>
                 <div class="quiz-text">${quiz.answer_1_3}</div>`;
                                    question1Answers.appendChild(answer13);
                                }
                            }

                            if (quiz.question_2) {
                                const question2 = document.createElement('div');
                                question2.className = 'question';
                                question2.innerHTML =
                                    ` <div class="bodyl-regular bottom-margin-64px">
                    Answer this question to quickly review some of the material from the video.
                  </div>
                  <div class="question-number">
                    <div class="question-text-number">1</div>
                    <div>/</div>
                    <div class="total-questions">1</div>
                  </div>
                 <div id="quizQuestion" class="headingm-regular bottom-margin-32px">
                   ${quiz.question_2}
                 </div>`;
                                quizWrapper.appendChild(question2);
                                const question2Answers = document.createElement('div');
                                question2Answers.className = 'answer-options';
                                question2.appendChild(question2Answers);

                                if (quiz.answer_2_1) {
                                    const answer21 = document.createElement('a');
                                    answer21.className = 'quiz-link w-inline-block';
                                    answer21.innerHTML =
                                        `<div class="quiz-pill">
                   <div class="quiz-embed w-embed">
                     <div class="${quiz.answer_2_1_value}"></div>
                   </div>
                 </div>
                 <div class="quiz-text">${quiz.answer_2_1}</div>`;
                                    question2Answers.appendChild(answer21);
                                }

                                if (quiz.answer_2_2) {
                                    const answer22 = document.createElement('a');
                                    answer22.className = 'quiz-link w-inline-block';
                                    answer22.innerHTML =
                                        `<div class="quiz-pill">
                   <div class="quiz-embed w-embed">
                     <div class="${quiz.answer_2_2_value}"></div>
                   </div>
                 </div>
                 <div class="quiz-text">${quiz.answer_2_2}</div>`;
                                    question2Answers.appendChild(answer22);
                                }

                                if (quiz.answer_2_3) {
                                    const answer23 = document.createElement('a');
                                    answer23.className = 'quiz-link w-inline-block';
                                    answer23.innerHTML =
                                        `<div class="quiz-pill">
                   <div class="quiz-embed w-embed">
                     <div class="${quiz.answer_2_3_value}"></div>
                   </div>
                 </div>
                 <div class="quiz-text">${quiz.answer_2_3}</div>`;
                                    question2Answers.appendChild(answer23);
                                }
                            }

                            if (quiz.question_3) {
                                const question3 = document.createElement('div');
                                question3.className = 'question';
                                question3.innerHTML =
                                    ` <div class="bodyl-regular bottom-margin-64px">
                    Answer this question to quickly review some of the material from the video.
                  </div>
                  <div class="question-number">
                    <div class="question-text-number">1</div>
                    <div>/</div>
                    <div class="total-questions">1</div>
                  </div>
                 <div id="quizQuestion" class="headingm-regular bottom-margin-32px">
                   ${quiz.question_3}
                 </div>`;
                                quizWrapper.appendChild(question3);
                                const question3Answers = document.createElement('div');
                                question3Answers.className = 'answer-options';
                                question3.appendChild(question3Answers);

                                if (quiz.answer_3_1) {
                                    const answer31 = document.createElement('a');
                                    answer31.className = 'quiz-link w-inline-block';
                                    answer31.innerHTML =
                                        `<div class="quiz-pill">
                   <div class="quiz-embed w-embed">
                     <div class="${quiz.answer_3_1_value}"></div>
                   </div>
                 </div>
                 <div class="quiz-text">${quiz.answer_3_1}</div>`;
                                    question3Answers.appendChild(answer31);
                                }

                                if (quiz.answer_3_2) {
                                    const answer32 = document.createElement('a');
                                    answer32.className = 'quiz-link w-inline-block';
                                    answer32.innerHTML =
                                        `<div class="quiz-pill">
                   <div class="quiz-embed w-embed">
                     <div class="${quiz.answer_3_2_value}"></div>
                   </div>
                 </div>
                 <div class="quiz-text">${quiz.answer_3_2}</div>`;
                                    question3Answers.appendChild(answer32);
                                }

                                if (quiz.answer_3_3) {
                                    const answer33 = document.createElement('a');
                                    answer33.className = 'quiz-link w-inline-block';
                                    answer33.innerHTML =
                                        `<div class="quiz-pill">
                   <div class="quiz-embed w-embed">
                     <div class="${quiz.answer_3_3_value}"></div>
                   </div>
                 </div>
                 <div class="quiz-text">${quiz.answer_3_3}</div>`;
                                    question3Answers.appendChild(answer33);
                                }
                            }
                        })
                        .then((quiz) => {
                            actualQuiz();
                        });
                });
            }
        });
    }

    function actualQuiz() {
        //dynamic number for the question number
        $('.question-text-number').html(function (i) {
            return 1 + i;
        });

        let questionItem = $(".question");
        let totalQuestions = questionItem.length;
        let gameOver = false;
        $(".total-questions").text(totalQuestions);

        // On page load
        questionItem.eq(0).addClass("is--current-question");
        //change the overall progress
        function updateUi() {
            let correctAnswers = $(".answered-correct").length;
            let progress = 100 * ($(".is--answered").length / totalQuestions);
            $(".correct-answers").text(correctAnswers);
            if (progress == 100) {
                gameOver = true;
            }
            if (correctAnswers == totalQuestions) {
                $("#rewatch-message").css("display", "none");
            } else {
                $("#correct-message").css("display", "none");
            }
        }

        //show if the answer is right or wrong
        function showAnswer(element) {
            let parentItem = $(element).closest(".question");
            $(element).closest(".answer-options").addClass("is--answered");
            let correctAnswer = element.querySelector(".true");
            if (correctAnswer) {
                parentItem.addClass("answered-correct");
                $(element).find(".quiz-pill").addClass("is--correct");
            } else {
                $(element).find(".quiz-pill").addClass("is--not-correct");
            }
            $(element).addClass("is--selected");
        };

        // show next question
        function nextQuestion() {
            if (gameOver == false) {
                let currentQuestion = $(".question.is--current-question");
                currentQuestion.next().addClass("is--current-question");
                currentQuestion.removeClass("is--current-question");
            } else {
                $(".quiz-list-wrapper").css("display", "none");
                $(".finish-screen").css("display", "block");
            }
        }

        //activate all functions on radio button click
        $(".quiz-link").on("click", function () {
            showAnswer(this);
            updateUi();
            setTimeout(nextQuestion, 1000);
        })
    };
    //send progress to the db
    function completeQuiz() {
        const data = {
            video_id: videoId,
            course_id: courseId,
        };
        const url =
            "https://us-central1-gearingup-education-platform.cloudfunctions.net/api/set-users-progress";
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                user.getIdToken().then(function (idToken) {
                    //req to the server
                    fetch(url, {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${idToken}`,
                            },
                            body: JSON.stringify(data),
                        })
                        .then(manageErrors) // call function to handle errors
                        .catch(function (error) {
                            if (error.status === 401) {
                                window.location.replace("/log-in");
                            }
                        });
                });
            } else {
                window.location.replace("/log-in");
            }
        });
    }
    })
    const button = document.getElementById("completeBtn");
    button.addEventListener("click", completeQuiz);


    //setting the video variables
    const videoProgress = [];
    const quizForm = document.getElementById("quizForm");
    const playBtn = document.querySelector("#play-button");
    const fullscreenBtn = document.querySelector("#fullscreen-video");
    const videoText = document.querySelector("#name-overlay");
    const closeBtn = document.querySelector("#close-video");
    const homeworkWrapper = document.getElementById("homework");

    playBtn.addEventListener("click", goFullScreen);
    fullscreenBtn.addEventListener("click", goFullScreen);
    //
    quizForm.style.display = "none";
    //
    fullscreenBtn.addEventListener("click", goFullScreen);
    videoText.addEventListener("click", playerPlay);

    //change the states of the videos
    function cardsState() {
        const videoCards = document.querySelectorAll(".video-card");
        for (let videoCard of videoCards) {
            if (!videoCard.querySelector(".complete").classList.contains("hidden")) {
                videoCard.querySelector(".locked").classList.add("hidden");
                videoCard.querySelector(".unlocked").classList.add("hidden");
                videoCard.querySelector(".video-block").classList.add("hidden");
                if (videoCard != videoCards[videoCards.length - 1]) {
                    const nextVideoCard = videoCard.nextElementSibling;
                    nextVideoCard.querySelector(".locked").classList.add("hidden");
                    nextVideoCard.querySelector(".unlocked").classList.remove("hidden");
                    nextVideoCard.querySelector(".video-block").classList.add("hidden");
                } else {
                    document
                        .querySelectorAll(".next-video-card")
                        .forEach((x) => x.classList.remove("hidden"));
                }
            }
        }
    }

    //set the first video as current
    function currentOnLoad() {
        const videoCards = document.querySelectorAll(".video-card");
        for (let videoCard of videoCards) {
            if (!videoCard.querySelector(".unlocked").classList.contains("hidden")) {
                videoCard.querySelector(".video-card-content").click();
            } else {
                const firstVideo = videoCards[0];
                firstVideo.querySelector(".video-card-content").click();
                firstVideo.querySelector(".video-block").classList.add("hidden");
            }
        }
        //video plays/pauses
        const player = document.querySelector("#main-video");
        const vimeoPlayer = new Vimeo.Player(player);

        vimeoPlayer.on("pause", () => {
            // we set up a listener function for the pause event, which posts the data as soon as the video pauses.
            updateProgress();
            videoText.classList.add("add-active");
            playBtn.style.display = "flex";
            homeworkWrapper.classList.remove("not-active");
        });
        vimeoPlayer.on("play", () => {
            playBtn.style.display = "none";
        });

        //tracking video progress
        vimeoPlayer.on("progress", function (data) {
            let currentPercent = Math.ceil(data.percent * 100);
            if (videoProgress.indexOf(currentPercent) != -1) {
                return;
            }
            var timestamp = new Date().getTime();
            timestamp = Math.floor(timestamp / 1000);
            videoProgress.push(currentPercent);
            videoProgress.lastUpdate = timestamp;
        });

        setInterval(updateProgress, 30000);

        function updateProgress() {
            if (videoProgress.lastSent == videoProgress.lastUpdate) {
                return;
            }
            videoProgress.lastSent = videoProgress.lastUpdate;
            localStorage.setItem("videoFrameNumber", videoProgress[videoProgress.length - 1])
        }
    }

    //fullscreen the video
    function goFullScreen() {
        const player = document.querySelector("#main-video");
        const vimeoPlayer = new Vimeo.Player(player);
        const playerWrapper = document.querySelector("#vimeo-video");
        vimeoPlayer.play();
        videoText.classList.remove("add-active");
        closeBtn.classList.add("add-active");
        fullscreenBtn.classList.remove("add-active");
        if (playerWrapper.requestFullscreen) {
            playerWrapper.requestFullscreen();
        } else if (playerWrapper.mozRequestFullScreen) {
            playerWrapper.mozRequestFullScreen();
        } else if (playerWrapper.webkitRequestFullscreen) {
            playerWrapper.webkitRequestFullscreen();
        } else if (playerWrapper.msRequestFullscreen) {
            playerWrapper.msRequestFullscreen();
        }
    }

    //play video in fullscreen mode
    function playerPlay() {
        const player = document.querySelector("#main-video");
        const vimeoPlayer = new Vimeo.Player(player);
        vimeoPlayer.play();
        videoText.classList.remove("add-active");
    }

    //exit the fullscreen
    closeBtn.addEventListener("click", exitFullScreen);

    function exitFullScreen() {
        closeBtn.classList.remove("add-active");
        homeworkWrapper.classList.add("not-active");
        fullscreenBtn.classList.remove("add-active");
        if (videoProgress[videoProgress.length - 1] === 100) {
            quizForm.style.display = "block";
        } else {
            quizForm.style.display = "none";
        }
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
