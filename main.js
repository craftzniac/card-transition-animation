console.log("working")
const cardsContainer = document.getElementsByClassName("cards-container")[0]
const extraContainer = document.getElementsByClassName("extra")

const card1 = document.querySelector(".sm-1")
const card2 = document.querySelector(".sm-2")
const card3 = document.querySelector(".sm-3")
const card4 = document.querySelector(".sm-4")

let prevWindowScrollY;
const windowHeight = window.innerHeight

const offset = 0;
let countBeforeNextTrigger = 0;

const card1Styles = getComputedStyle(card1)
const card2Styles = getComputedStyle(card2)
const card3Styles = getComputedStyle(card3)
const card4Styles = getComputedStyle(card4)

const card1Translate = parseInt(card1Styles.translate);
const card2Translate = parseInt(card2Styles.translate);
const card3Translate = parseInt(card3Styles.translate);
const card4Translate = parseInt(card4Styles.translate);

window.addEventListener('scroll', (e) => {
    if (countBeforeNextTrigger === 2) {
        animateCardsOnStep();
    } else {
        ++countBeforeNextTrigger
    }

})

//animte the translation of the 4cards
function animateCardsOnStep() {
    const { top: topOfCardsContainer, bottom: bottomOfCardsContainer } = cardsContainer.getBoundingClientRect()

    console.log("prevWindowScrollY: ", prevWindowScrollY, "window.scrollY: ", window.scrollY)
    if (prevWindowScrollY === undefined) {
        prevWindowScrollY = window.scrollY
    } else {
        //animation runs only if card is withing view
        if (topOfCardsContainer < windowHeight - offset
            && bottomOfCardsContainer > offset
        ) {


            const card1Step = Math.abs(card1Translate / 3)
            const card2Step = Math.abs(card2Translate / 3)
            const card3Step = Math.abs(card3Translate / 3)
            const card4Step = Math.abs(card4Translate / 3)

            if (prevWindowScrollY <= window.scrollY) {//scrolling down
                console.log("scroll down")
                // animation forward
                card1.style.translate = ` ${Math.min(parseInt(card1Styles.translate) + card1Step, 0)}px`
                card2.style.translate = ` ${Math.max(parseInt(card2Styles.translate) - card2Step, 0)}px`
                card3.style.translate = ` ${Math.max(parseInt(card3Styles.translate) - card3Step, 0)}px`
                card4.style.translate = ` ${Math.min(parseInt(card4Styles.translate) + card4Step, 0)}px`
            } else if (prevWindowScrollY > window.scrollY) { //scrolling up
                console.log("scroll up")
                card1.style.translate = ` ${Math.max(parseInt(card1Styles.translate) - card1Step, card1Translate)}px`
                card2.style.translate = ` ${Math.min(parseInt(card2Styles.translate) + card2Step, card2Translate)}px`
                card3.style.translate = ` ${Math.min(parseInt(card3Styles.translate) + card3Step, card3Translate)}px`
                card4.style.translate = ` ${Math.max(parseInt(card4Styles.translate) - card4Step, card4Translate)}px`
            }
        }

        prevWindowScrollY = window.scrollY
    }

    countBeforeNextTrigger = 0;
}






