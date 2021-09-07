const {Room} = require("@iryu54/room-lib-server").models

const dices = [[ // yellow
  "Bon écoutez-moi !",
  "Tu vas pas me croire",
  "L'autre jour",
  "Je dois vous avouer",
  "Quand j'étais petit",
  "Vous savez que",
], [ // orange
    "Mais",
    "Or",
    "Donc",
    "C'est pourquoi",
    "Hélas",
    "J'ajoute",
  ], [ // red
    "Tout à coup",
    "Bon, tu me connais",
    "Je précise que",
    "En fait",
    "Vous allez me dire",
    "Le plus drôle",
  ], [ // purple
    "Et là, surprise !",
    "Là, ça se complique",
    "Ah, j'oubliais !",
    "D'un autre coté",
    "C'est vrai que",
    "Du coup",
  ], [ // blue
    "J'avais prévu le coup",
    "Finalement",
    "Moi, tranquille",
    "Et le pire !",
    "Et là, patatra",
    "Bref !",
  ], [ //black
    "Conclusion",
    "C'est comme ça que",
    "Comme dirait ma mamie",
    "La prochaine fois",
    "Et le drame",
    "Alors, vous allez rire",
  ],]

const themes  = {
  "A": {
    "12": "J'ai embrassé un crapaud",
    "13": "Je viens d'une famille très spéciale",
    "14": "Mes astuces pour séduire",
    "15": "La machine à voyager dans le temps. Mon expérience",
    "16": "J'ai inventé un nouveau sport",
    "21": "Je vais vous avouer quelques chose de grave",
    "23": "Bloqué(e) dans un ascenseur",
    "24": "Il va y avoir une grande exposition de mes oeuvres",
    "25": "Le pique-nique infernal...",
    "26": "En cuisine, j'improvise avec n'importe quoi.",
    "31": "J'ai jamais pu retirer mes skis",
    "32": "Ma collection unique au monde",
    "34": "Je ne me déplace qu'à cheval",
    "35": "C'est pas toujours super de gagner au loto",
    "36": "Mon dentiste est fou",
    "41": "Comment un gnou m'a adopté(e)",
    "42": "L'histoire du poisson qui n'aimait pas l'eau",
    "43": "L'entretien qui a changé ma vie",
    "45": "Je fais de superbe imitations avec ma bouche",
    "46": "Je n'aurais pas dû dire non",
    "51": "Pourquoi je suis une femme merveilleuse",
    "52": "J'ai un QI de 650 !",
    "53": "Les effets secondaires du Zunibate de Télurène",
    "54": "Y'a du pétrole dans mon jardin",
    "56": "Comment je me suis faché(e) avec le Président des Etats-Unis",
    "61": "Pardon, j'ai perdu la mémoire",
    "62": "Il y a un zombie parmi nous",
    "63": "Elle sera prête mardi",
    "64": "L'homme idéal, c'est moi !",
    "65": "La forêt maudite",
  },
  "B": {
    "12": "Parfois l'amour ça fait peur",
    "13": "J'ai fait le tour du monde en patin à glace",
    "14": "J'ai l'air timide mais en fait",
    "15": "L'histoire de Choupinette au pays des nuages",
    "16": "Elle était dérrière la porte",
    "21": "Louis XIV était mon arrière-arrière-arrière-arrière-grand-père",
    "23": "J'ai eu l'oscar du plus beau collier de nouilles",
    "24": "J'ai recontré une championne du monde de bilboquet",
    "25": "La panne d'essence",
    "26": "J'ai garé mon tapis volant en double file",
    "31": "Je vis dans un 2m²",
    "32": "Il m'arrive de dire des gros mots sans m'en rendre compte",
    "34": "Mes vacances à Dunkerque",
    "35": "J'ai passé une nuit en apesanteur",
    "36": "Mon dernier saut en parachute",
    "41": "Il y a un génie dans ma cafetière.",
    "42": "Mon programme politique pour la paix sur terre",
    "43": "J'ai pris des cours de savoir vivre ",
    "45": "J'ai pas l'air comme ça, mais j'ai braqué une banque",
    "46": "Mon inoubliable soirée pyjama",
    "51": "Tu sais ce que j'ai retrouvé dans un nem ?",
    "52": "J'ai un chien qui parle",
    "53": "C'est pas de ma faute, c'est mon coiffeur",
    "54": "J'ai rien à dire...",
    "56": "Je vais vous dire qui je suis vraiment",
    "61": "Comment j'ai sali mon T-shirt",
    "62": "Pourquoi je ne prends qu'une douche tous les six mois",
    "63": "J'ai inventé une pilule magique",
    "64": "J'ai encore été viré(e)",
    "65": "La trompette du voisin",
  },
  "C": {
    "12": "Mon premier grand amour",
    "13": "Je lis l'avenir dans la purée",
    "14": "Le bonheur d'être seul",
    "15": "Je suis recherché(e) par la police",
    "16": "Pourquoi je suis devenu(e) clown",
    "21": "La légende du chevalier sans épée",
    "23": "Je ronfle",
    "24": "Comment j'ai bâti mon immense fortune",
    "25": "Une histoire tellement courte",
    "26": "Sincérement, je trouve que tout est beau",
    "31": "Dans la lune...",
    "32": "Mon séjour dans le Grand Nord",
    "34": "J'ai trés peur des Zigouisgouis",
    "35": "Y'a un éléphant dans ma cuisine !",
    "36": "Mon rêve cette nuit",
    "41": "Je vous raconte mon prochain film",
    "42": "J'ai passé une très bonne soirée avec une fée...",
    "43": "Un jour, j'ai mangé 23 oeufs durs !",
    "45": "Comment réparer un moteur de tracteur avec un trombone",
    "46": "Le crime était presque parfait",
    "51": "La préhistoire, c'était vachement bien",
    "52": "J'ai un doigt magique",
    "53": "J'aime bien les gens qui ne m'aiment pas",
    "54": "Je me suis remis(e) à la luge",
    "56": "Je suis devenu(e) Président(e) d'une île",
    "61": "Il va pleuvoir",
    "62": "J'ai sauvé la planète, mais personne le sait",
    "63": "Du paté dans mes chausettes",
    "64": "Mon cousin parle une langue inconnue",
    "65": "J'ai dréssé mon chat",
  }, 
  "D": {
    "12": "La fin du monde c'est mardi",
    "13": "Depuis un an et demi, j'ai décidé de ne plus avoir d'amis",
    "14": "Mon GPS m'a fait un coup tordu",
    "15": "Seul(e) dans la tempête avec ma bouée de canard",
    "16": "L'art de porter un tutu rose",
    "21": "Je connais personnellement la princesse des neiges",
    "23": "Je vous racontes ma vie en 2 minutes",
    "24": "J'ai vécu avec la femme invisible(ou l'homme invisible)",
    "25": "Devines avec qui j'ai diné hier ?!",
    "26": "J'ai été enlevé(e) par des extra-terrestres",
    "31": "Un jour, j'ai sauvé un bébé phoque",
    "32": "Heureusement que j'étais là à l'anniversaire de ma cousine",
    "34": "Comment j'ai tué un lion",
    "35": "J'ai été agent secret, mais je n'ai pas le droit de vous en parler",
    "36": "Ma pire journée",
    "41": "La vérité sur les trois petits cochons",
    "42": "J'ai créé l'associationdes adorateurs des chou-fleurs",
    "43": "L'héritage de ma grande tante",
    "45": "J'ai lu un livre qu'il ne fallait pas lire",
    "46": "Comment j'ai fini gardien de phare",
    "51": "Evidemment que je crois aux fantômes",
    "52": "Je vous racontes une histoire triste",
    "53": "Je vais me marier à Las-Vegas. La classe !",
    "54": "Bientôt on ira sur Mars",
    "56": "Un magicien m'a fait un tour incroyable !",
    "61": "J'ai découvert un nouveau continent",
    "62": "Je ne veux plus faire de chirurgie ésthétique",
    "63": "J'ai voyagé sur le toit du TGV",
    "64": "On utilise que 10% de notre cerveau",
    "65": "C'était un scir d'automne",
  }
}
function  Theme() {
}

Theme.prototype.launchDices = function () {
  this.dices = dices.map(dice => {
    return {
      label: pickRandom(dice),
      isOk: false
    }
  })
}
Theme.prototype.chooseTheme = function (cardCharacter, numbers) {
  this.letter = cardCharacter
  this.numbers = numbers
  if (Array.isArray(numbers)) {
    const choice1 = numbers[0].toString() + numbers[1].toString()
    const choice2 = numbers[1].toString() + numbers[0].toString()
    this.choices = [
      { id: choice1, theme: themes[cardCharacter][choice1], votes: []},
      { id: choice2, theme: themes[cardCharacter][choice2], votes: []},
    ]
  } else {
    this.choice = themes[cardCharacter][numbers.toString()]
  }
}
Theme.prototype.voteTheme = function (username, numbers) {
  const choice = this.choices.filter(choice => choice.id === numbers[0].toString() + numbers[1].toString()).pop()
  const voteUsernames = choice.votes.map(vote => vote.username)
  if (!voteUsernames.includes(username)) {
    choice.votes.push({ username })
  } else {
    choice.votes = choice.votes.filter(vote => vote.username !== username)
  }
}
Theme.prototype.clickOnWord = function (wordIndex) {
  this.dices[wordIndex].isOk = !this.dices[wordIndex].isOk
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
module.exports = Theme