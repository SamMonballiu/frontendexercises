require('./index.css'); /*adds content of index.css in JS */
const crel = require('crel') /* (first do 'add yarn crel') equiv. of 'using crel;' */

const articles = [
    { title: "Lorem ipsum dolor sit amet", body: "Nulla quis dolor et sem consectetur tincidunt. Nulla at quam ut orci pharetra condimentum. Sed sodales eu lacus eget laoreet. Nam ut ex mollis, facilisis orci vitae, finibus dolor. Nulla id consectetur lorem. Quisque facilisis bibendum risus eget scelerisque. Aenean eu diam id velit porta efficitur. Vivamus eget pellentesque nunc, eget viverra felis. Donec non dolor venenatis ex posuere dapibus. Curabitur vitae ligula vitae lacus suscipit tincidunt ac in massa. Proin nunc libero, consectetur tristique mauris et, aliquam feugiat tellus. Nam eu lectus scelerisque urna iaculis luctus." },
    { title: "Proin velit pulvinar eros", body: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non elit id dui mattis tincidunt. Curabitur dapibus orci sed lorem dictum, a consectetur tortor tristique. Maecenas tempor, ante sodales condimentum iaculis, nulla ligula imperdiet ipsum, in condimentum elit risus vitae nisi. Nunc ac malesuada elit, id sollicitudin massa. Nulla pulvinar mattis nisi id semper. Proin hendrerit, risus ac commodo lacinia, ligula metus vulputate ante, id facilisis felis tellus vitae diam. Morbi nec urna at arcu sollicitudin pharetra. Phasellus ac nibh velit. In ut tempus erat, vel scelerisque justo. Aliquam aliquam justo sed sem congue, et hendrerit mauris ultricies." },
    { title: "Morbi egestas convallis nec", body: "Mauris accumsan risus eget sapien scelerisque consectetur. Curabitur ex est, consequat non tincidunt vel, posuere sed nunc. Proin malesuada urna nisi, quis fringilla elit aliquam eu. Praesent erat turpis, scelerisque quis orci vitae, gravida placerat mauris. Integer mi eros, dignissim eget mauris et, iaculis porttitor sapien. Morbi consequat sagittis lacus nec porttitor." },
    { title: "Fusce quis risus purus", body: "Ut vulputate orci et metus efficitur, sed dignissim dolor rhoncus. Aliquam dapibus non turpis ac tincidunt. Nam lorem mi, semper sit amet velit vitae, malesuada congue justo. Mauris congue sagittis odio sit amet sollicitudin. Morbi vulputate eleifend sem ut feugiat. Proin vel tempus neque, sit amet tincidunt elit. Nunc tempor massa et tempus suscipit. Vestibulum imperdiet feugiat diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { title: "Integer maximus fermentum", body: "Quisque malesuada mi ac mauris consequat, id laoreet ex cursus. Fusce gravida, mi id facilisis dapibus, augue tellus scelerisque orci, vel dictum elit odio non leo. In tincidunt nisl sed lorem iaculis tristique. Etiam pharetra tincidunt lectus. Nulla facilisi. Nunc feugiat imperdiet dui id scelerisque. Quisque placerat augue et cursus pretium. Praesent tincidunt sagittis dui, iaculis commodo diam lacinia vel. Quisque non pellentesque mi, vitae tristique mauris. Vivamus mattis neque eu magna sollicitudin, ac bibendum ex pulvinar. Donec lobortis tristique dictum. Donec vehicula, elit id ornare placerat, mi est commodo diam, et tristique augue nisl et mi." },
  ];


// gebruik de DOM API om bovenstaande artikels op de pagina te plaatsen.
// per artikel maak je volgende elementen aan:
// <article>
//   <h1>titel</h1>
//   <section>
//     <p>body</p>
//   </section>
// </article>
// schrijf hiervoor een functie renderArticle(article)


function renderArticle(article) {
    return crel('article',
        { 'class': 'articleContainer' },
        crel('h1', article.title),
        crel('a', { href: "https://www.google.com/search?q=" + article.title, target: '_blank' }, "Google it"),
        crel('hr'),
        crel('section', crel('p', article.body)),

    );
}

function renderArticles(articles) {
    return crel("div", articles.map(renderArticle));
}

function renderApp() {
    return crel('div',
        crel('header', 'Articles for today'),
        renderArticles(articles),
        crel('footer', '(c) 2019 The Imaginary Foundation')
    );
}

document.getElementById("root").appendChild(renderApp());

  


