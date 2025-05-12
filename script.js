function home () {
    document.getElementById('home').style.display = 'block';
    document.getElementById('gioca').style.display = 'none';
    document.getElementById('giochino_carino_carino').style.display = 'none';
    document.getElementById('personaggi').style.display = 'none';
    document.getElementById('secondo_giochino').style.display = 'none';
    document.getElementById('cost_img').style.display = 'none';

}
function gioca () {
    document.getElementById('home').style.display = 'none';
    document.getElementById('gioca').style.display = 'block';
    document.getElementById('giochino_carino_carino').style.display = 'none';
    document.getElementById('personaggi').style.display = 'none';
    document.getElementById('secondo_giochino').style.display = 'none';
    document.getElementById('cost_img').style.display = 'none';
}
function gioco_scelto(x) {
    document.getElementById('home').style.display = 'none';
    document.getElementById('gioca').style.display = 'block';
    document.getElementById('giochino_carino_carino').style.display = 'none';
    document.getElementById('personaggi').style.display = 'none';
    document.getElementById('secondo_giochino').style.display = 'none';
    document.getElementById('cost_img').style.display = 'none';
    if (x==1 || x==2) {
        scegli_personaggio(x); //x indica il gioco scelto
    } else {
        gioco_3();
    } 
}
function scegli_personaggio(x) {
    document.getElementById('home').style.display = 'none';
    document.getElementById('gioca').style.display = 'none';
    document.getElementById('giochino_carino_carino').style.display = 'none';
    document.getElementById('personaggi').style.display = 'block';
    document.getElementById('secondo_giochino').style.display = 'none';
    document.getElementById('cost_img').style.display = 'none';

    //for per creare gli alieni
    for (let i = 1; i <= 3; i++) {
        const ids = "pers" + i;
        const ctx = document.getElementById(ids).getContext('2d');
        navicella(i, ctx);
    }
    const ctx = document.getElementById('pers4').getContext('2d');
    astronauta(ctx);

    //x indica il gioco, l'altro numero indica il personaggio così so quale funzione avviare per i personaggi e con quale parametro
    document.getElementById('canva1').onclick = function() {
        console.log('controllo del bellissimo canva 1')
        gioco_1_2(x, 1);
    };
    document.getElementById('canva2').onclick = function() {
        console.log('controllo di sto... stupendo canva 2')
        gioco_1_2(x, 2);
    };
    document.getElementById('canva3').onclick = function() {
        console.log('controllo del ca...so che serve per il canva 3')
        gioco_1_2(x, 3);
    };
    document.getElementById('canva4').onclick = function() {
        console.log('controllo del co....stosissimo canva 4')
        gioco_1_2(x, 4);
    };
}
positionX = 20;
positionY = -10;
speed = 10;
const canvasWidth = window.innerWidth * 0.99;
const canvasHeight = window.innerHeight * 0.5;
//queste due variabili mi servono per il secondo gioco per segnare i punti fatti e le domande a cui si ha già risposto
domande_quiz = Array(8).fill(false);
punti_quiz = 0;
domande_mostrate = Array(8).fill(false);
risposte_mostrate = false;
//questa serve nel secondo gioco perchè se si preme di no all'alert non deve essere mostrato finchè si è nel range di quel pianeta
dentroArea = Array(8).fill(false);
//questa variabile mi serve per controllare di quali pianeti ho dato le info
info = Array(8).fill(false);
function gioco_1_2(gioco, figura) {
    document.getElementById('home').style.display = 'none';
    document.getElementById('gioca').style.display = 'none';
    document.getElementById('giochino_carino_carino').style.display = 'block';
    document.getElementById('personaggi').style.display = 'none';
    document.getElementById('cost_img').style.display = 'none';

    draw_figure(figura, positionX, positionY);

    //array con i canvas, i colori dei pianeti e i raggi dei pianeti
    const canvasIds = ['pianeta1', 'pianeta2', 'pianeta3', 'pianeta4', 'pianeta5', 'pianeta6', 'pianeta7', 'pianeta8', 'pianeta9'];
    const colori = ['rgb(254, 182, 2)', 'rgb(169, 124, 80)', 'rgb(255, 220, 110)', 'rgb(152, 219, 124)', 'rgb(239, 65, 54)', 'rgb(226, 124, 72)', 'rgb(254, 211, 112)', 'rgb(19, 99, 216)', 'rgb(22, 38, 128)'];
    const raggio = [370, 15, 30, 37.5, 22.5, 150, 135, 112.5, 105];

    //for per creare i pianeti
    for (let i = 0; i < canvasIds.length; i++) {
        const canvas = document.getElementById(canvasIds[i]);
        const ctx = canvas.getContext('2d');
        const diametro = raggio[i] * 2;
        canvas.width = diametro;
        canvas.height = diametro;
        const cerchio = new Path2D();
        cerchio.arc(raggio[i], raggio[i], raggio[i], 0, 2 * Math.PI);
        ctx.fillStyle = colori[i];
        ctx.fill(cerchio);
    }

    //a seconda di quale gioco viene scelto mostro un alert diverso con le istruzioni
    if (gioco == 1) {
        Swal.fire({
            title: "Benvenuto nell'Esplorazione del Sistema Solare!",
            html: `
                <p>Ecco le regole:</p>
                <ul style="text-align: left;">
                    <li><strong>Obiettivo:</strong> Esplora ciascun pianeta per conoscere fatti unici e curiosità.</li>
                    <li><strong>Come giocare:</strong>
                        <ul>
                            <li>Muovi il tuo personaggio con le freccette della tastiera per esplorare i pianeti del sistema solare.</li>
                            <li>Ogni pianeta è rappresentato da un cerchio colorato.</li>
                            <li>Quando il personaggio raggiunge la posizione del pianeta, apparirà una spiegazione del pianeta.</li>
                        </ul>
                    </li>
                    <li><strong>Fine del gioco:</strong> L'esplorazione si completa una volta visitati tutti i pianeti ma puoi continuare ad esplorare lo spazio quanto vuoi.</li>
                </ul>
                <p>Inizia il viaggio e buon divertimento!</p>
            `,
            confirmButtonText: "Inizia l'Esplorazione!",
            confirmButtonColor: "#3085d6"
        });
    } else if (gioco == 2) {
        Swal.fire({
            title: "Benvenuto al quiz dei pianeti!",
            html: `
                <p>Ecco le regole:</p>
                <ul style="text-align: left;">
                    <li><strong>Obiettivo:</strong> Rispondi correttamente alle domande su ciascun pianeta per accumulare punti!</li>
                    <li><strong>Come giocare:</strong> 
                        <ul>
                            <li>Muovi il personaggio con le freccette della tastiera per esplorare i pianeti del sistema solare.</li>
                            <li>Quando raggiungi un pianeta, apparirà una domanda relativa a quel pianeta (tutte le domande sono relative al gioco "Conosci i pianeti" quindi ti consigliamo di giocare prima a quello).</li>
                            <li>Scegli una risposta tra le opzioni proposte.</li>
                        </ul>
                    </li>
                    <li><strong>Punteggi:</strong> Ogni risposta corretta ti fa guadagnare un punto. Il tuo obiettivo è completare il quiz con il massimo punteggio!</li>
                    <li><strong>Attenzione:</strong> Risposte errate non danno punti, ma puoi continuare a rispondere agli altri quiz!</li>
                    <li><strong>Fine del gioco:</strong> Il gioco termina quando hai risposto alle domande di tutti i pianeti.</li>
                </ul>
                <p>In bocca al lupo e buon divertimento!</p>
            `,
            confirmButtonText: "Inizia il gioco!",
            confirmButtonColor: "#3085d6"
        });
        
    }

    //questa funzione mi permette di muovere il personaggio
    function muovi_person(event) {
        if (event.key === 'ArrowLeft') {
            positionX -= speed;
        } else if (event.key === 'ArrowRight') {
            positionX += speed;
        } else if (event.key === 'ArrowUp') {
            positionY -= speed;
        } else if (event.key === 'ArrowDown') {
            positionY += speed;
        }

        //queste variabili mi segnano le coordinate massime del personaggio
        positionX = Math.max(0, Math.min(positionX, canvasWidth - 165));
        positionY = Math.max(-10, Math.min(positionY, canvasHeight - 165));
        
        //mi disegno il personaggio nella posizione nuova ogni volta che si muove
        draw_figure(figura, positionX, positionY);

        //controllo le coordinate del personaggio e se si trova alla coordinata di un pianeta mostro le informazioni (gioco 1) o il quiz (gioco 2)
        switch (gioco) {
            case 1:
                if (Math.abs(positionX - 140) <= speed) {
                    if (!info[0]) {
                        Swal.fire({
                            title: 'Questo è Mercurio',
                            html: '<img src="img/Mercurio.png" alt="Mercurio" style="width:100px; height:100px;"><p>Vuoi saperne di più?</p>',
                            imageWidth: 100,
                            imageHeight: 100,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Sì",
                            showCancelButton: true,
                            cancelButtonColor: 'red',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Mercurio",
                                    text: "Mercurio è il pianeta più vicino al Sole e il più piccolo del sistema solare. La sua superficie è ricoperta da crateri e simile a quella della Luna. Non ha un'atmosfera significativa, quindi le temperature variano drasticamente, passando da estremi caldi a freddi. Mercurio ha un periodo di rotazione molto lento, impiegando circa 59 giorni terrestri per completare una rotazione attorno al proprio asse.",
                                });
                            }
                        });
                        info[0] = true;
                        info[1] = false;
                    }
                } else if (Math.abs(positionX - 200) <= speed) {
                    if (!info[1]) {
                        Swal.fire({
                            title: 'Questa è Venere',
                            html: '<img src="img/Venere.png" alt="Venere" style="width:100px; height:100px;"><p>Vuoi saperne di più?</p>',
                            imageWidth: 100,
                            imageHeight: 100,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Sì",
                            showCancelButton: true,
                            cancelButtonColor: 'red',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Venere",
                                    text: "Venere è simile alla Terra in termini di dimensioni e composizione, ma ha un'atmosfera densa composta principalmente di anidride carbonica, con nubi di acido solforico. Questo provoca un effetto serra estremo, rendendolo il pianeta più caldo del sistema solare. La superficie di Venere è caratterizzata da vulcani e pianure laviche, e la rotazione avviene in senso retrogrado, rendendo un giorno su Venere più lungo di un anno.",
                                });
                            }
                        });
                        info[1] = true;
                        info[0] = false;
                        info[2] = false;
                    }
                } else if (Math.abs(positionX - 295) <= speed) {
                    if (!info[2]) {
                        Swal.fire({
                            title: 'Questa è la Terra',
                            html: '<img src="img/Terra.png" alt="Terra" style="width:100px; height:100px;"><p>Vuoi saperne di più?</p>',
                            imageWidth: 100,
                            imageHeight: 100,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Sì",
                            showCancelButton: true,
                            cancelButtonColor: 'red',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Terra",
                                    text: "La Terra è l'unico pianeta conosciuto che ospita vita. Ha una superficie ricca di acqua, con oceani che coprono circa il 71% della sua superficie. L'atmosfera è composta principalmente di azoto e ossigeno, e favorisce una vasta gamma di condizioni climatiche. La Terra ha un satellite naturale, la Luna, e il suo movimento di rotazione crea le diverse stagioni e il ciclo giorno-notte."
                                });
                            }
                        });
                        info[2] = true;
                        info[1] = false;
                        info[3] = false;
                    }
                    
                } else if (Math.abs(positionX - 375) <= speed) {
                    if (!info[3]) {
                        Swal.fire({
                            title: 'Questa è Marte',
                            html: '<img src="img/Marte.png" alt="Marte" style="width:100px; height:100px;"><p>Vuoi saperne di più?</p>',
                            imageWidth: 100,
                            imageHeight: 100,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Sì",
                            showCancelButton: true,
                            cancelButtonColor: 'red',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Marte",
                                    text: "Marte, noto come il 'pianeta rosso', è caratterizzato dalla presenza di ossido di ferro sulla sua superficie, che gli conferisce il suo colore distintivo. Ha una sottile atmosfera composta principalmente di anidride carbonica. Marte presenta caratteristiche geologiche uniche, tra cui il vulcano più grande del sistema solare, Olympus Mons, e il canyon più profondo, Valles Marineris. È oggetto di intense ricerche per la possibile presenza di vita passata."
                                });
                            }
                        });
                        info[3] = true;
                        info[2] = false;
                        info[4] = false;
                    }
                } else if (Math.abs(positionX - 560) <= speed) {
                    if (!info[4]) {
                        Swal.fire({
                            title: 'Questo è Giove',
                            html: '<img src="img/Giove.png" alt="Giove" style="width:100px; height:100px;"><p>Vuoi saperne di più?</p>',
                            imageWidth: 100,
                            imageHeight: 100,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Sì",
                            showCancelButton: true,
                            cancelButtonColor: 'red',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Giove",
                                    text: "Giove è il pianeta più grande del sistema solare ed è un gigante gassoso. È famoso per la sua Grande Macchia Rossa, una tempesta gigantesca che infuria da secoli. La sua atmosfera è composta principalmente di idrogeno ed elio, ed è caratterizzato da bande di nubi e tempeste. Giove ha anche un vasto sistema di anelli e ben 79 lune, tra cui le quattro lune galileiane: Io, Europa, Ganimede e Callisto."
                                });
                            }
                        });
                        info[4] = true;
                        info[3] = false;
                        info[5] = false;
                    }
                } else if (Math.abs(positionX - 870) <= speed) {
                    if (!info[5]) {
                        Swal.fire({
                            title: 'Questo è Saturno',
                            html: '<img src="img/Saturno.png" alt="Saturno" style="width:100px; height:100px;"><p>Vuoi saperne di più?</p>',
                            imageWidth: 100,
                            imageHeight: 100,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Sì",
                            showCancelButton: true,
                            cancelButtonColor: 'red',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Saturno",
                                    text: "Saturno è noto per i suoi spettacolari anelli, composti da particelle di ghiaccio e roccia. È un gigante gassoso, simile a Giove, e ha una composizione atmosferica simile, con idrogeno ed elio. Saturno è il secondo pianeta più grande del sistema solare e possiede 83 lune conosciute, tra cui Titano, che è più grande di Mercurio e ha un'atmosfera densa."
                                });
                            }
                        });
                        info[5] = true;
                        info[4] = false;
                        info[6] = false;
                    }
                } else if (Math.abs(positionX - 1130) <= speed) {
                    if (!info[6]) {
                        Swal.fire({
                            title: 'Questo è Urano',
                            html: '<img src="img/Urano.png" alt="Urano" style="width:100px; height:100px;"><p>Vuoi saperne di più?</p>',
                            imageWidth: 100,
                            imageHeight: 100,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Sì",
                            showCancelButton: true,
                            cancelButtonColor: 'red',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Urano",
                                    text: "Urano è un gigante ghiaccioso, unico nel suo genere poiché ruota su un asse quasi orizzontale, il che provoca un'estrema inclinazione degli assi. La sua atmosfera è composta principalmente di idrogeno, elio e metano, che conferisce al pianeta il suo caratteristico colore blu. Urano ha un sistema di anelli e 27 lune conosciute, tra cui Titania e Oberon."
                                });
                            }
                        });
                        info[6] = true;
                        info[5] = false;
                        info[7] = false;
                    }
                    
                } else if (Math.abs(positionX - 1360) <= speed) {
                    if (!info[7]) {
                        Swal.fire({
                            title: 'Questo è Nettuno',
                            html: '<img src="img/Nettuno.png" alt="Nettuno" style="width:100px; height:100px;"><p>Vuoi saperne di più?</p>',
                            imageWidth: 100,
                            imageHeight: 100,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Sì",
                            showCancelButton: true,
                            cancelButtonColor: 'red',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Nettuno",
                                    text: "Nettuno è l'ultimo pianeta del sistema solare ed è anch'esso un gigante ghiaccioso. La sua atmosfera è caratterizzata da venti estremamente forti e tempeste, tra cui la Grande Macchia Blu, una tempesta simile alla Macchia Rossa di Giove. Nettuno ha un colore blu intenso a causa della presenza di metano nell'atmosfera. Possiede un sistema di anelli sottili e 14 lune, tra cui Tritone, che è la luna più grande e ha un'atmosfera propria."
                                });
                            }
                        });    
                        info[7] = true;
                        info[6] = false;
                    }
                }
                break;
            case 2:
                if (Math.abs(positionX - 140) <= speed) {
                    if (!domande_quiz[0] && !dentroArea[0]) {
                        dentroArea[0] = true;
                        Swal.fire({
                            title: 'Quiz su Mercurio',
                            html: '<img src="img/Mercurio.png" alt="Mercurio" style="width:100px; height:100px;"><p>Vuoi rispondere alla domanda?</p>',
                            imageWidth: 100,
                            imageHeight: 100,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Sì",
                            showCancelButton: true,
                            cancelButtonColor: 'red',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Qual è una delle principali caratteristiche della superficie di Mercurio?",
                                    showDenyButton: true,
                                    showCancelButton: true,
                                    confirmButtonText: 'È ricoperta da vulcani attivi.',
                                    denyButtonText: 'È coperta di crateri simili a quelli della Luna.',
                                    cancelButtonText: 'È coperta da densi ghiacci polari.',
                                    confirmButtonColor: "grey",
                                    denyButtonColor: "grey",
                                    cancelButtonColor: "grey"
                                }).then((answer) => {
                                    if (answer.isConfirmed) {
                                        Swal.fire({title: "Risposta sbagliata", timer: 2000, timerProgressBar: true, html: '<img src="img/error.png" alt="" style="width:100px; height:100px;">',});
                                    } else if (answer.isDenied) {
                                        Swal.fire({title: "Risposta corretta!", timer: 2000, timerProgressBar: true, html: '<img src="img/success.png" alt="" style="width:100px; height:100px;">',});
                                        punti_quiz = punti_quiz + 1;
                                    } else if (answer.isDismissed) {
                                        Swal.fire({title: "Risposta sbagliata", timer: 2000, timerProgressBar: true, html: '<img src="img/error.png" alt="" style="width:100px; height:100px;">',});
                                    }
                                });
                                domande_quiz[0] = true;
                            }
                        });
                        dentroArea[0] = true;
                        dentroArea[1] = false;
                    }
                } else if (Math.abs(positionX - 200) <= speed) {
                    if (!domande_quiz[1] && !dentroArea[1]) {
                        dentroArea[1] = true;
                        Swal.fire({
                            title: 'Quiz su Venere',
                            html: '<img src="img/Venere.png" alt="Venere" style="width:100px; height:100px;"><p>Vuoi rispondere alla domanda?</p>',
                            imageWidth: 100,
                            imageHeight: 100,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Sì",
                            showCancelButton: true,
                            cancelButtonColor: 'red',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Perchè Venere ha temperature elevate rispetto agli altri pianeti?",
                                    showDenyButton: true,
                                    showCancelButton: true,
                                    confirmButtonText: 'La sua atmosfera densa creo un effetto serra estremo.',
                                    denyButtonText: 'Ha una superficie piena di vulcani in eruzione costante.',
                                    cancelButtonText: 'Si trova molto vicina a Mercurio, il pianeta più caldo.',
                                    confirmButtonColor: "grey",
                                    denyButtonColor: "grey",
                                    cancelButtonColor: "grey"
                                }).then((answer) => {
                                    if (answer.isConfirmed) {
                                        Swal.fire({title: "Risposta corretta!", timer: 2000, timerProgressBar: true, html: '<img src="img/success.png" alt="" style="width:100px; height:100px;">'});
                                        punti_quiz = punti_quiz + 1;
                                    } else if (answer.isDenied) {
                                        Swal.fire({title: "Risposta sbagliata", timer: 2000, timerProgressBar: true, html: '<img src="img/error.png" alt="" style="width:100px; height:100px;">'});
                                    } else if (answer.isDismissed) {
                                        Swal.fire({title: "Risposta sbagliata", timer: 2000, timerProgressBar: true, html: '<img src="img/error.png" alt="" style="width:100px; height:100px;">'});
                                    }
                                });
                                domande_quiz[1] = true;
                            }
                        });
                        dentroArea[1] = true;
                        dentroArea[0] = false;
                        dentroArea[2] = false;
                    }
                } else if (Math.abs(positionX - 290) <= speed) {
                    if (!domande_quiz[2] && !dentroArea[2]) {
                        dentroArea[2] = true;
                        Swal.fire({
                            title: 'Quiz sulla Terra',
                            html: '<img src="img/Terra.png" alt="Terra" style="width:100px; height:100px;"><p>Vuoi rispondere alla domanda?</p>',
                            imageWidth: 100,
                            imageHeight: 100,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Sì",
                            showCancelButton: true,
                            cancelButtonColor: 'red',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Quale elemento è predominante nell'atmosfera terrestre?",
                                    showDenyButton: true,
                                    showCancelButton: true,
                                    confirmButtonText: 'Ossigeno.',
                                    denyButtonText: 'Anidride carbonica.',
                                    cancelButtonText: 'Azoto.',
                                    confirmButtonColor: "grey",
                                    denyButtonColor: "grey",
                                    cancelButtonColor: "grey"
                                }).then((answer) => {
                                    if (answer.isConfirmed) {
                                        Swal.fire({title: "Risposta sbagliata", timer: 2000, timerProgressBar: true, html: '<img src="img/error.png" alt="" style="width:100px; height:100px;">',});
                                    } else if (answer.isDenied) {
                                        Swal.fire({title: "Risposta sbagliata", timer: 2000, timerProgressBar: true, html: '<img src="img/error.png" alt="" style="width:100px; height:100px;">',});
                                    } else if (answer.isDismissed) {
                                        Swal.fire({title: "Risposta corretta!", timer: 2000, timerProgressBar: true, html: '<img src="img/success.png" alt="" style="width:100px; height:100px;">',});
                                        punti_quiz = punti_quiz + 1;
                                    }
                                });
                                domande_quiz[2] = true;
                            }
                        });
                        dentroArea[2] = true;
                        dentroArea[1] = false;
                        dentroArea[3] = false;
                    }
                    
                } else if (Math.abs(positionX - 360) <= speed) {
                    if (!domande_quiz[3] && !dentroArea[3]) {
                        dentroArea[3] = true;
                        Swal.fire({
                            title: 'Quiz su Marte',
                            html: '<img src="img/Marte.png" alt="Marte" style="width:100px; height:100px;"><p>Vuoi rispondere alla domanda?</p>',
                            imageWidth: 100,
                            imageHeight: 100,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Sì",
                            showCancelButton: true,
                            cancelButtonColor: 'red',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Qual è la causa del caratteristico colore rosso di Marte?",
                                    showDenyButton: true,
                                    showCancelButton: true,
                                    confirmButtonText: 'Presenza di ossido di ferro sulla superficie.',
                                    denyButtonText: 'La sua atmosfera ricca di metano.',
                                    cancelButtonText: 'Le frequenti tempeste di polvere.',
                                    confirmButtonColor: "grey",
                                    denyButtonColor: "grey",
                                    cancelButtonColor: "grey"
                                }).then((answer) => {
                                    if (answer.isConfirmed) {
                                        Swal.fire({title: "Risposta corretta!", timer: 2000, timerProgressBar: true, html: '<img src="img/success.png" alt="" style="width:100px; height:100px;">',});
                                        punti_quiz = punti_quiz + 1;
                                    } else if (answer.isDenied) {
                                        Swal.fire({title: "Risposta sbagliata", timer: 2000, timerProgressBar: true, html: '<img src="img/error.png" alt="" style="width:100px; height:100px;">',});
                                    } else if (answer.isDismissed) {
                                        Swal.fire({title: "Risposta sbagliata", timer: 2000, timerProgressBar: true, html: '<img src="img/error.png" alt="" style="width:100px; height:100px;">',});
                                    }
                                });
                                domande_quiz[3] = true;
                            }
                        });
                        dentroArea[3] = true;
                        dentroArea[2] = false;
                        dentroArea[4] = false;
                    }
                } else if (Math.abs(positionX - 550) <= speed) {
                    if (!domande_quiz[4] && !dentroArea[4]) {
                        dentroArea[4] = true;
                        Swal.fire({
                            title: 'Quiz su Giove',
                            html: '<img src="img/Giove.png" alt="Giove" style="width:100px; height:100px;"><p>Vuoi rispondere alla domanda?</p>',
                            imageWidth: 100,
                            imageHeight: 100,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Sì",
                            showCancelButton: true,
                            cancelButtonColor: 'red',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Qual è il nome della famosa tempesta che infuria su Giove da secoli?",
                                    showDenyButton: true,
                                    showCancelButton: true,
                                    confirmButtonText: 'La Grande Macchia Blu.',
                                    denyButtonText: 'La Grande Macchia Rossa.',
                                    cancelButtonText: 'La Grande Tempesta Galileiana.',
                                    confirmButtonColor: "grey",
                                    denyButtonColor: "grey",
                                    cancelButtonColor: "grey"
                                }).then((answer) => {
                                    if (answer.isConfirmed) {
                                        Swal.fire({title: "Risposta sbagliata", timer: 2000, timerProgressBar: true, html: '<img src="img/error.png" alt="" style="width:100px; height:100px;">',});
                                    } else if (answer.isDenied) {
                                        Swal.fire({title: "Risposta corretta!", timer: 2000, timerProgressBar: true, html: '<img src="img/success.png" alt="" style="width:100px; height:100px;">',});
                                        punti_quiz = punti_quiz + 1;
                                    } else if (answer.isDismissed) {
                                        Swal.fire({title: "Risposta sbagliata", timer: 2000, timerProgressBar: true, html: '<img src="img/error.png" alt="" style="width:100px; height:100px;">',});
                                    }
                                });
                                domande_quiz[4] = true;
                            }
                        });
                        dentroArea[4] = true;
                        dentroArea[5] = false;
                        dentroArea[3] = false;
                    }
                } else if (Math.abs(positionX - 850) <= speed) {
                    if (!domande_quiz[5] && !dentroArea[5]) {
                        dentroArea[5] = true;
                        Swal.fire({
                            title: 'Quiz su Saturno',
                            html: '<img src="img/Saturno.png" alt="Saturno" style="width:100px; height:100px;"><p>Vuoi rispondere alla domanda?</p>',
                            imageWidth: 100,
                            imageHeight: 100,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Sì",
                            showCancelButton: true,
                            cancelButtonColor: 'red',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Di cosa sono fatti principalmente gli anelli di Saturno?",
                                    showDenyButton: true,
                                    showCancelButton: true,
                                    confirmButtonText: 'polvere e ghiaccio.',
                                    denyButtonText: 'Metano e ammoniaca.',
                                    cancelButtonText: 'Ferro e silicio.',
                                    confirmButtonColor: "grey",
                                    denyButtonColor: "grey",
                                    cancelButtonColor: "grey"
                                }).then((answer) => {
                                    if (answer.isConfirmed) {
                                        Swal.fire({title: "Risposta corretta!", timer: 2000, timerProgressBar: true, html: '<img src="img/success.png" alt="" style="width:100px; height:100px;">',});
                                        punti_quiz = punti_quiz + 1;
                                    } else if (answer.isDenied) {
                                        Swal.fire({title: "Risposta sbagliata", timer: 2000, timerProgressBar: true, html: '<img src="img/error.png" alt="" style="width:100px; height:100px;">',});
                                    } else if (answer.isDismissed) {
                                        Swal.fire({title: "Risposta sbagliata", timer: 2000, timerProgressBar: true, html: '<img src="img/error.png" alt="" style="width:100px; height:100px;">',});
                                    }
                                });
                                domande_quiz[5] = true;
                            }
                        });
                        dentroArea[5] = true;
                        dentroArea[6] = false;
                        dentroArea[4] = false;
                    }
                } else if (Math.abs(positionX - 1140) <= speed) {
                    if (!domande_quiz[6] && !dentroArea[6]) {
                        dentroArea[6] = true;
                        Swal.fire({
                            title: 'Quiz su Urano',
                            html: '<img src="img/Urano.png" alt="Urano" style="width:100px; height:100px;"><p>Vuoi rispondere alla domanda?</p>',
                            imageWidth: 100,
                            imageHeight: 100,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Sì",
                            showCancelButton: true,
                            cancelButtonColor: 'red',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Perchè Urano ha un'inclinazione così particolare rispetto agli altri pianeti?",
                                    showDenyButton: true,
                                    showCancelButton: true,
                                    confirmButtonText: 'È stato probabilmente colpito da un grande oggetto in passato.',
                                    denyButtonText: 'Il suo campo magnetico è estremamente forte.',
                                    cancelButtonText: 'La gravità di Nettuno ha deformato il suo asse',
                                    confirmButtonColor: "grey",
                                    denyButtonColor: "grey",
                                    cancelButtonColor: "grey"
                                }).then((answer) => {
                                    if (answer.isConfirmed) {
                                        Swal.fire({title: "Risposta corretta!", timer: 2000, timerProgressBar: true, html: '<img src="img/success.png" alt="" style="width:100px; height:100px;">',});
                                        punti_quiz = punti_quiz + 1;
                                    } else if (answer.isDenied) {
                                        Swal.fire({title: "Risposta sbagliata", timer: 2000, timerProgressBar: true, html: '<img src="img/error.png" alt="" style="width:100px; height:100px;">',});
                                    } else if (answer.isDismissed) {
                                        Swal.fire({title: "Risposta sbagliata", timer: 2000, timerProgressBar: true, html: '<img src="img/error.png" alt="" style="width:100px; height:100px;">',});
                                    }
                                });
                                domande_quiz[6] = true;
                            }
                        });
                        dentroArea[6] = true;
                        dentroArea[7] = false;
                        dentroArea[5] = false;
                    }
                    
                } else if (Math.abs(positionX - 1300) <= speed) {
                    if (!domande_quiz[7] && !dentroArea[7]) {
                        dentroArea[7] = true;
                        Swal.fire({
                            title: 'Quiz su Nettuno',
                            html: '<img src="img/Nettuno.png" alt="Nettuno" style="width:100px; height:100px;"><p>Vuoi rispondere alla domanda?</p>',
                            imageWidth: 100,
                            imageHeight: 100,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Sì",
                            showCancelButton: true,
                            cancelButtonColor: 'red',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: "Quale caratteristica atmosferica rende Nettuno unico per i suoi venti estremamente forti?",
                                    showDenyButton: true,
                                    showCancelButton: true,
                                    confirmButtonText: 'La Macchia Verde',
                                    denyButtonText: 'La Macchia Viola',
                                    cancelButtonText: 'La Grande Macchia Blu',
                                    confirmButtonColor: "grey",
                                    denyButtonColor: "grey",
                                    cancelButtonColor: "grey"
                                }).then((answer) => {
                                    if (answer.isConfirmed) {
                                        Swal.fire({title: "Risposta sbagliata", timer: 2000, timerProgressBar: true, html: '<img src="img/error.png" alt="" style="width:100px; height:100px;">',});
                                    } else if (answer.isDenied) {
                                        Swal.fire({title: "Risposta sbagliata", timer: 2000, timerProgressBar: true, html: '<img src="img/error.png" alt="" style="width:100px; height:100px;">',});
                                    } else if (answer.isDismissed) {
                                        Swal.fire({title: "Risposta corretta!", timer: 2000, timerProgressBar: true, html: '<img src="img/success.png" alt="" style="width:100px; height:100px;">',});
                                        punti_quiz = punti_quiz + 1;
                                    }
                                });
                                domande_quiz[7] = true;
                            }
                        });
                        dentroArea[7] = true;
                        dentroArea[6] = false;
                    }
                } else if (domande_quiz.every(Boolean) && !risposte_mostrate) {
                    //controllo se tutte le celle sono true
                    Swal.fire({
                        title: "Complimenti hai finito il quiz!!",
                        text: `Punti totali: ${punti_quiz}`
                    });
                    risposte_mostrate = true;
                }
                break;
            }
    }
    window.addEventListener('keydown', muovi_person);

}
function draw_figure(fig, posX, posY) {
    const canvas = document.getElementById('person');
    //controllo che il canvas esiste
    if (canvas) {
        const ctx5 = canvas.getContext('2d');
        if (ctx5) {
            canvas.width = window.innerWidth * 0.99;
            canvas.height = canvasHeight;
            //prima di ridisegnare il canvas me lo cancello se no ci sarebbero un sacco di canvas tipo uno dietro l'altro
            ctx5.clearRect(0, 0, canvas.width, canvas.height);

            ctx5.save();
            ctx5.translate(posX, posY);

            if (fig === 1 || fig === 2 || fig === 3) {
                navicella(fig, ctx5);
            } else if (fig === 4) {
                astronauta(ctx5)
            }

            ctx5.restore();     
        } 
    }
}
function gioco_3 () {
    //cambio lo sfodno perchè l'immagine renderebbe il gioco confusionario
    document.body.style.background = '#030436';
    document.getElementById('home').style.display = 'none';
    document.getElementById('gioca').style.display = 'none';
    document.getElementById('giochino_carino_carino').style.display = 'none';
    document.getElementById('personaggi').style.display = 'none';
    document.getElementById('secondo_giochino').style.display = 'block';
    document.getElementById('cost_img').style.display = 'block';

    const canvas = document.getElementById("stelline");
    const ctx = stelline.getContext("2d");

    //questo mega vettore contiene tutte le informazioni di ogni costellazione, è come se fosse uno struct
    const constellations = [
        {
            contatore_linee: 0,
            name: "Cassiopea",
            color: "#ff0080",
            stars: [
                { x: 850, y: 80 }, //Stella 0
                { x: 920, y: 70 }, //Stella 1
                { x: 910, y: 130 }, //Stella 2
                { x: 950, y: 140 }, //Stella 3
                { x: 970, y: 200 }, //Stella 4
            ],
            connections: [
                { start: 0, end: 1 },
                { start: 1, end: 2 },
                { start: 2, end: 3 },
                { start: 3, end: 4 }
            ]
        },
        {
            contatore_linee: 0,
            name: "Cefeo",
            color: "#22ff00",
            stars: [
                { x: 710, y: 145 }, //Stella 0
                { x: 700, y: 100 }, //Stella 1
                { x: 645, y: 50 }, //Stella 2
                { x: 600, y: 90 }, //Stella 3
                { x: 540, y: 95 }, //Stella 4
                { x: 645, y: 135 }, //Stella 5
            ],
            connections: [
                { start: 0, end: 1 },
                { start: 1, end: 2 },
                { start: 2, end: 3 },
                { start: 3, end: 4 },
                { start: 3, end: 5 },
                { start: 5, end: 1 },
                { start: 5, end: 0 },
            ]
        },
        {
            contatore_linee: 0,
            name: "Dragone",
            color: "red",
            stars: [
                { x: 280, y: 205 }, //Stella 0
                { x: 280, y: 270 }, //Stella 1
                { x: 350, y: 270 }, //Stella 2
                { x: 380, y: 220 }, //Stella 3
                { x: 530, y: 180 }, //Stella 4
                { x: 480, y: 260 }, //Stella 5
                { x: 450, y: 360 }, //Stella 6
                { x: 550, y: 400 }, //Stella 7
                { x: 650, y: 400 }, //Stella 8
                { x: 735, y: 370 }, //Stella 9
                { x: 740, y: 330 } //Stella 10
            ],
            connections: [
                { start: 0, end: 1 },
                { start: 1, end: 2 },
                { start: 2, end: 3 },
                { start: 3, end: 4 },
                { start: 3, end: 0 },
                { start: 4, end: 5 },
                { start: 5, end: 6 },
                { start: 6, end: 7 },
                { start: 7, end: 8 },
                { start: 8, end: 9 },
                { start: 9, end: 10 }
            ]
        },
        {
            contatore_linee: 0,
            name: "Giraffa",
            color: "#00c3ff",
            stars: [
                { x: 810, y: 320 }, //Stella 0
                { x: 1020, y: 320 }, //Stella 1
                { x: 1020, y: 240 }, //Stella 2
                { x: 1090, y: 235 }, //Stella 3
                { x: 1190, y: 200 }, //Stella 4
                { x: 1100, y: 280 }, //Stella 5
                { x: 1150, y: 300 }, //Stella 6
                { x: 1235, y: 290 }, //Stella 7
            ],
            connections: [
                { start: 0, end: 1 },
                { start: 1, end: 2 },
                { start: 2, end: 3 },
                { start: 3, end: 4 },
                { start: 1, end: 5 },
                { start: 5, end: 6 },
                { start: 6, end: 7 }
            ]
        },
        {
            contatore_linee: 0,
            name: "Lince",
            color: "#ff9100",
            stars: [
                { x: 1130, y: 350 }, //Stella 0
                { x: 1110, y: 420 }, //Stella 1
                { x: 1170, y: 500 }, //Stella 2
                { x: 1140, y: 570 }, //Stella 3
            ],
            connections: [
                { start: 0, end: 1 },
                { start: 1, end: 2 },
                { start: 2, end: 3 }
            ]
        },
        {
            contatore_linee: 0,
            name: "Orsa Maggiore",
            color: "magenta",
            stars: [
                { x: 440, y: 460 }, //Stella 0
                { x: 500, y: 440 }, //Stella 1
                { x: 560, y: 470 }, //Stella 2
                { x: 630, y: 470 }, //Stella 3
                { x: 770, y: 430 }, //Stella 4
                { x: 890, y: 340 }, //Stella 5
                { x: 1000, y: 390 }, //Stella 6
                { x: 920, y: 420 }, //Stella 7
                { x: 900, y: 490 }, //Stella 8
                { x: 950, y: 540 }, //Stella 9
                { x: 1040, y: 520 }, //Stella 10
                { x: 1040, y: 560 }, //Stella 11
                { x: 740, y: 640 }, //Stella 12
                { x: 650, y: 615 }, //Stella 13
                { x: 650, y: 520 }, //Stella 14
                { x: 780, y: 490 }, //Stella 15
            ],
            connections: [
                { start: 0, end: 1 },
                { start: 1, end: 2 },
                { start: 2, end: 3 },
                { start: 3, end: 4 },
                { start: 4, end: 5 },
                { start: 5, end: 6 },
                { start: 6, end: 7 },
                { start: 7, end: 8 },
                { start: 8, end: 9 },
                { start: 9, end: 10 },
                { start: 9, end: 11 },
                { start: 9, end: 12 },
                { start: 12, end: 13 },
                { start: 13, end: 14 },
                { start: 14, end: 15 },
                { start: 14, end: 3 },
                { start: 15, end: 4 }
            ]
        },
        {
            contatore_linee: 0,
            name: "Orsa Minore",
            color: "yellow",
            stars: [
                { x: 760, y: 195 }, //Stella 0
                { x: 710, y: 200 }, //Stella 1
                { x: 690, y: 255 }, //Stella 2
                { x: 645, y: 255 }, //Stella 3
                { x: 640, y: 320 }, //Stella 4
                { x: 680, y: 325 }, //Stella 5
            ],
            connections: [
                { start: 0, end: 1 }, 
                { start: 1, end: 2 }, //Stella 1 a Stella 2
                { start: 2, end: 3 }, //Stella 2 a Stella 3
                { start: 3, end: 4 }, 
                { start: 4, end: 5 }, 
                { start: 5, end: 2 }  //Stella 5 a Stella 2
            ]
        }
    ];

    //nell'array mi salvo quali linee vengono fatte così ogni volta che ne traccio una nuova viene cancellato tutto e rifatto con stelle e linee nelle posizioni giuste
    lines = [];
    dragging = false;
    startStarIndex = null;
    currentPos = { x: 0, y: 0 };
    activeConstellation = null;

    //questo serve a disegnare la stella e non il puntino, la uso solo per la stella polare perchè è la più importante
    function drawStar(ctx, x, y, radius, color) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.moveTo(0, 0 - radius);
    
        for (let i = 0; i < 5; i++) {
            ctx.rotate(Math.PI / 5);
            ctx.lineTo(0, 0 - radius * 0.5);
            ctx.rotate(Math.PI / 5);
            ctx.lineTo(0, 0 - radius);
        }
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }

    //disegno tutte le stelle di una costellazione
    function drawStars(constellation) {
        //questo tipo di for lo uso per scorrere il vettore in modo più semplice senza dover creare indici o altro per scorrere il vettore
        constellation.stars.forEach((star, index) => {
            if (constellation.name === "Orsa Minore" && index === 0) {
                //se è la stella 0 della costellazione orsa minore disegno la stella
                drawStar(ctx, star.x, star.y, 12, constellation.color);
            } else {
                //altrimenti disegno un cerchio
                ctx.beginPath();
                ctx.arc(star.x, star.y, 6, 0, Math.PI * 2);
                ctx.fillStyle = constellation.color;
                ctx.fill();
            }
        });
    }

    //mi disegno tutte le linee salvate nel vettore
    function drawLines() {
        lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(line.start.x, line.start.y);
            ctx.lineTo(line.end.x, line.end.y);
            ctx.strokeStyle = line.color;
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }

    //cancello tutto ciò che c'è nel canvas e lo ridisegno
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        constellations.forEach(drawStars);
        drawLines();
    }

    //questo mi serve a trovare l'indice della stella su cui clicco
    function findStarIndex(x, y) {
        for (let c = 0; c < constellations.length; c++) {
            const constellation = constellations[c];
            const index = constellation.stars.findIndex(star => {
                const dx = x - star.x;
                const dy = y - star.y;
                return Math.sqrt(dx * dx + dy * dy) < 10;
            });
            if (index !== -1) return { constellation, index };
        }
        return null;
    }

    //verifico se quelle due stelle si possono connettere
    function isConnectionAllowed(start, end) {
        return start.constellation.connections.some(connection =>
            (connection.start === start.index && connection.end === end.index) ||
            (connection.start === end.index && connection.end === start.index)
        );
    }

    //evento per inizio del trascinamento
    canvas.addEventListener('mousedown', (e) => {
        //getBoundingClientRect fornisce informazioni sulla posizione di un elemento html in relazione allo schermo, in questo modo ogni volta che muovo la linea per collegare le due 
        //stelle viene ridisegnata in base a dove si trova il mouse. poi faccio quelle sottrazioni in modo da trovare la posizione del mouse in relazione al canva 
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const starInfo = findStarIndex(x, y);
        
        if (starInfo) {
            dragging = true;
            startStarIndex = starInfo;
            activeConstellation = starInfo.constellation;
            currentPos = { x, y };
        }
    });

    //evento per il trascinamento
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const hoverStarInfo = findStarIndex(x, y);

        if (dragging) {
            //se sto trascinando il mouse cambio la posizione della linea istante per istante e per farlo cancello tutto il canvas e lo ridisegno
            currentPos = { x, y };
            clearCanvas();

            //mi disegno la linea dallo start index al punto in cui si trova ora il mouse
            ctx.beginPath();
            ctx.moveTo(startStarIndex.constellation.stars[startStarIndex.index].x, 
                    startStarIndex.constellation.stars[startStarIndex.index].y);
            ctx.lineTo(currentPos.x, currentPos.y);
            ctx.strokeStyle = activeConstellation.color;
            ctx.lineWidth = 2;
            ctx.stroke();

            //cambio il cursore a `not-allowed` se la connessione non è valida
            if (hoverStarInfo && hoverStarInfo.constellation === activeConstellation &&
                hoverStarInfo.index !== startStarIndex.index) {
                if (!isConnectionAllowed(startStarIndex, hoverStarInfo)) {
                    canvas.style.cursor = 'not-allowed';
                } else {
                    canvas.style.cursor = 'pointer';
                }
            }
        } else {
            //se il cursore si trova sopra una delle stelle il cursore lo imposto pointer, altrimenti lo imposto normale
            canvas.style.cursor = hoverStarInfo ? 'pointer' : 'default';
        }
    });


    //funzione per verificare se la costellazione è completata in base al contatore
    function isConstellationComplete(constellation) {
        return constellation.contatore_linee === constellation.connections.length;
    }

    //evento per terminare il trascinamento
    canvas.addEventListener('mouseup', (e) => {
        if (dragging) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const endStarInfo = findStarIndex(x, y);
            
            //nel momento in cui non clicco più sul mouse verifico se le due stelle fanno parte della stessa costellazione e si possono unire
            if (endStarInfo && endStarInfo.constellation === activeConstellation &&
                endStarInfo.index !== startStarIndex.index &&
                isConnectionAllowed(startStarIndex, endStarInfo)) {
                lines.push({
                    start: activeConstellation.stars[startStarIndex.index],
                    end: activeConstellation.stars[endStarInfo.index],
                    color: activeConstellation.color
                });

                //incremento il contatore delle linee per la costellazione e così quando arriva ad un determinato numero mi spiega la costellazione
                activeConstellation.contatore_linee += 1;
                clearCanvas();

                //controllo se la costellazione è completa e mostro un alert diverso per ogni costellazione
                if (isConstellationComplete(activeConstellation)) {
                    if (activeConstellation.name == 'Cassiopea') {
                        Swal.fire({
                            title: `Hai completato la costellazione Cassiopea!`,
                            html: `
                                <img src="img/constellations.png" alt="" style="width:100px; height:100px; margin-bottom: 10px;">
                                <p>Cassiopea è una costellazione facilmente riconoscibile, famosa per la sua forma a "W" o "M", a seconda della stagione in cui viene osservata. Nella mitologia greca, rappresenta la regina Cassiopea, nota per la sua bellezza e presunzione. Si trova nell'emisfero boreale e contiene diverse stelle brillanti, tra cui Schedar e Caph. Cassiopea è anche vicina al Polo Nord celeste, il che la rende visibile in tutte le stagioni nel cielo settentrionale.</p>
                            `,
                            confirmButtonText: 'Grazie!',
                        });
                    } else if (activeConstellation.name == 'Cefeo') {
                        Swal.fire({
                            title: `Hai completato la costellazione Cefeo!`,
                            html: `
                                <img src="img/constellations.png" alt="" style="width:100px; height:100px; margin-bottom: 10px;">
                                <p>Cefeo è una costellazione che rappresenta un re etiope nella mitologia greca, marito di Cassiopea. Ha una forma simile a un quadrato o a un rombo e si trova nell'emisfero settentrionale, vicino a Cassiopea. Cefeo contiene alcune stelle note, come Alderamin, che è la stella più brillante della costellazione. All'interno di Cefeo si trova anche l'ammasso stellare NGC 188, uno dei più antichi conosciuti.</p>
                            `,
                            confirmButtonText: 'Grazie!',
                        });
                    } else if (activeConstellation.name == 'Dragone') {
                        Swal.fire({
                            title: `Hai completato la costellazione Dragone!`,
                            html: `
                                <img src="img/constellations.png" alt="" style="width:100px; height:100px; margin-bottom: 10px;">
                                <p>La costellazione del Dragone (Draco) è una delle più lunghe del cielo e avvolge il polo nord celeste. Rappresenta il drago Ladone della mitologia greca, che custodiva le mele d'oro nel giardino delle Esperidi. Il Dragone ha una forma serpentina e contiene alcune stelle significative, come Thuban, che era la stella polare circa 4.000 anni fa. Questa costellazione è anche nota per il suo ricco numero di galassie e oggetti del cielo profondo.</p>
                            `,
                            confirmButtonText: 'Grazie!',
                        });
                    } else if (activeConstellation.name == 'Giraffa') {
                        Swal.fire({
                            title: `Hai completato la costellazione Giraffa!`,
                            html: `
                                <img src="img/constellations.png" alt="" style="width:100px; height:100px; margin-bottom: 10px;">
                                <p>La costellazione della Giraffa (Camelopardalis) è una costellazione meno nota situata nell'emisfero boreale. Il suo nome deriva dalla parola greca "camelopardalis", che significa "camaleonte" o "giraffa", e si riferisce all'animale esotico. Giraffa è una costellazione grande e poco luminosa, ma contiene alcune galassie interessanti, come NGC 2403, un membro del Gruppo delle Galassie di M81.</p>
                            `,
                            confirmButtonText: 'Grazie!',
                        });
                    } else if (activeConstellation.name == 'Lince') {
                        Swal.fire({
                            title: `Hai completato la costellazione Lince!`,
                            html: `
                                <img src="img/constellations.png" alt="" style="width:100px; height:100px; margin-bottom: 10px;">
                                <p>La costellazione della Lince (Lynx) è una costellazione piccola e relativamente recente, creata nel XVII secolo dal cartografo Johannes Hevelius. Il suo nome si riferisce all'animale, noto per la sua capacità di vedere in condizioni di scarsa illuminazione. La Lince contiene diverse stelle che non sono particolarmente brillanti, ma è riconoscibile grazie alla sua forma allungata. Tra le sue stelle più luminose c'è Alpha Lynx, che è il suo membro più brillante.</p>
                            `,
                            confirmButtonText: 'Grazie!',
                        });
                    } else if (activeConstellation.name == 'Orsa Maggiore') {
                        Swal.fire({
                            title: `Hai completato la costellazione Orsa Maggiore!`,
                            html: `
                                <img src="img/constellations.png" alt="" style="width:100px; height:100px; margin-bottom: 10px;">
                                <p>L'Orsa Maggiore (Ursa Major) è una delle costellazioni più famose e riconoscibili del cielo, nota soprattutto per il suo asterismo chiamato "Grande Carro" o "Grande Ursa". Rappresenta un orso nella mitologia greca e contiene molte stelle luminose, tra cui Dubhe e Merak, che formano la "coda" e il "fianco" dell'orso. È utilizzata da secoli per navigare, in quanto le sue stelle aiutano a trovare il Polo Nord celeste.</p>
                            `,
                            confirmButtonText: 'Grazie!',
                        });
                    } else if (activeConstellation.name == 'Orsa Minore') {
                        Swal.fire({
                            title: `Hai completato la costellazione Orsa Minore!`,
                            html: `
                                <img src="img/constellations.png" alt="" style="width:100px; height:100px; margin-bottom: 10px;">
                                <p>L'Orsa Minore (Ursa Minor) è una costellazione che contiene la stella polare, Polaris, che è importante per la navigazione. La forma dell'Orsa Minore è simile a quella dell'Orsa Maggiore, ma più piccola. Rappresenta un piccolo orso nella mitologia. L'Orsa Minore è riconoscibile grazie al suo asterismo noto come "Piccolo Carro". Oltre a Polaris, la costellazione contiene altre stelle interessanti, ma è meno luminosa rispetto all'Orsa Maggiore.</p>
                            `,
                            confirmButtonText: 'Grazie!',
                        });
                    }
                }
            }
            
            dragging = false;
            startStarIndex = null;
            activeConstellation = null;
            canvas.style.cursor = 'default';
            clearCanvas();
        }
    });

    //disegno tutte le stelle
    constellations.forEach(drawStars);

    //mostro le istruzioni del gioco
    Swal.fire({
        title: "Benvenuto nell'Esplorazione delle Costellazioni!",
        html: `
            <p>Scopri le meraviglie del cielo e connettiti con le stelle!</p>
            <ul style="text-align: left;">
                <li><strong>Obiettivo:</strong> Collega le stelle delle costellazioni in un'avventura interattiva!</li>
                <li><strong>Come giocare:</strong>
                    <ul>
                        <li>Ogni costellazione ha un colore diverso. Fai clic su una stella per iniziare a tracciare una connessione.</li>
                        <li>Trascina il cursore verso un'altra stella per vedere se puoi collegarle.</li>
                        <li>Se la connessione è valida, si aggiungerà una linea che rappresenta il collegamento tra le stelle.</li>
                        <li>Ogni volta che completerai una costellazione ti sarà spiegato qual è e le sue caratteristiche.</li>
                        <li>Se ti dovessi trovare in difficolta puoi aiutarti con l'immagine delle costellazioni alla quale puoi accedere con il pulsante in alto a destra sullo schermo</li>
                    </ul>
                </li>
                <li><strong>Fine del gioco:</strong> Completa tutte le costellazioni per terminare il gioco.</li>
            </ul>
        `,
        confirmButtonText: "Inizia l'Esplorazione!",
        confirmButtonColor: "#3085d6"
    });
}
function img_costellazioni () {
    Swal.fire({
        iconHtml: '<img src="img/costellazioni_mie.png" style="width: 940px; height: 600px;">',
        showConfirmButton: false
    });
}

//tutte queste sono le funzioni che uso per disenare i personaggi (fatti completamente a mano, ci ho messo un pomeriggio intero quindi apprezzi l'impegno)
function navicella(fig, ctx) {
    if (!ctx) return; //verifico se il contesto esiste, altrimenti esco dalla funzione
    
    //disegno la parte superiore della navicella
    const cerchio1 = new Path2D();
    cerchio1.arc(90, 66, 50, Math.PI, 0); 
    ctx.fillStyle = '#56a9e8';
    ctx.fill(cerchio1);
    ctx.fillStyle = '#56a9e8';
    ctx.fillRect(40, 66, 100, 42);
    //a seconda del personaggio disegno un alieno diverso
    switch (fig) {
        case 1:
            alieno1(ctx);
            break;
        case 2:
            alieno2(ctx);
            break;
        case 3:
            alieno3(ctx);
            break;
    }
    //disegno la parte inferiore della navicella
    const cerchio2 = new Path2D();
    cerchio2.arc(90, 108, 50, 0, Math.PI); 
    ctx.fillStyle = 'grey';
    ctx.fill(cerchio2);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(150, 96);
    ctx.arcTo(162, 96, 162, 108, 12);
    ctx.lineTo(162, 120);
    ctx.lineTo(18, 120);
    ctx.arcTo(18, 96, 30, 96, 12);
    ctx.closePath();
    ctx.fillStyle = '#313436'; 
    ctx.fill();
    const cerchio3 = new Path2D();
    cerchio3.arc(40, 108, 6, 0, 2 * Math.PI);
    cerchio3.arc(90, 108, 6, 0, 2 * Math.PI);
    cerchio3.arc(140, 108, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#e3cf39';
    ctx.fill(cerchio3);
}
function alieno1(ctx) {
    if (!ctx) return;
    //testa e corpo
    const alieno = new Path2D();
    alieno.arc(90, 78, 35, Math.PI, 0);
    ctx.fillStyle = '#f26805';
    ctx.fill(alieno);
    ctx.fillRect(55, 78, 70, 18);
    //occhio e pupilla
    const occhio = new Path2D();
    occhio.arc(90, 67, 12, 2 * Math.PI, 0);
    ctx.fillStyle = 'white';
    ctx.fill(occhio);
    const pupilla = new Path2D();
    pupilla.arc(90, 67, 5, 2 * Math.PI, 0);
    ctx.fillStyle = 'black';
    ctx.fill(pupilla);
    //sorriso
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(90, 80, 10, 0, Math.PI);
    ctx.stroke();
}
function alieno2(ctx) {
    if (!ctx) return;
    //testa e corpo
    ctx.beginPath();
    ctx.arc(90, 65, 30, 2 * Math.PI, 0);
    ctx.arc(90, 115, 30, 2 * Math.PI, 0);
    ctx.fillStyle = '#b705f2';
    ctx.fill();
    //occhio e pupilla
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(90, 60, 10, 2 * Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(90, 60, 4, 2 * Math.PI, 0);
    ctx.fill();
    //sorriso
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(90, 75, 10, 0, Math.PI);
    ctx.stroke();
}
function alieno3(ctx) {
    if (!ctx) return;
    //questo serve per fare le antennine, ho fatto due linee oblique e poi ho messo dei pallini dove finisce la linea
    ctx.fillStyle = '#4ad13b';
    ctx.strokeStyle = '#4ad13b';
    ctx.lineWidth = 6;
    ctx.beginPath(); 
    ctx.moveTo(65, 60);
    ctx.lineTo(50, 45);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(115, 60);
    ctx.lineTo(130, 45);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(52, 47, 6, 2 * Math.PI, 0);
    ctx.arc(128, 47, 6, 2 * Math.PI, 0);
    ctx.fill();
    //testa e corpo
    ctx.beginPath();
    ctx.arc(90, 70, 33.5, Math.PI, 0);
    ctx.fillStyle = '#4ad13b';
    ctx.fill();
    ctx.fillRect(56, 70, 67, 26);
    //occhi e pupille
    ctx.beginPath();
    ctx.arc(75, 63, 11.5, 2 * Math.PI, 0);
    ctx.arc(105, 63, 11.5, 2 * Math.PI, 0);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(75, 63, 4.5, 2 * Math.PI, 0);
    ctx.arc(105, 63, 4.5, 2 * Math.PI, 0);
    ctx.fillStyle = 'black';
    ctx.fill();
    //sorriso
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(90, 80, 10, 0, Math.PI);
    ctx.stroke();
}
function astronauta(ctx) {
    if (!ctx) return;
    console.log('ciao astronauta bellissimo');
    //astronauta
    cerchio4 = new Path2D();
    cerchio4.arc(90, 45, 33, 2 * Math.PI, 0);
    ctx.fillStyle = '#dedede';
    ctx.fill(cerchio4);
    cerchio5 = new Path2D();
    cerchio5.arc(90, 45, 23, 2 * Math.PI, 0);
    ctx.fillStyle = '#3375d4';
    ctx.fill(cerchio5);
    //corpo
    ctx.beginPath();
    ctx.moveTo(67.5, 75);
    ctx.lineTo(112.5, 75);
    ctx.arcTo(132.5, 75, 132.5, 120, 20);
    ctx.lineTo(132.5, 120);
    ctx.lineTo(47.5, 120);
    ctx.arcTo(47.5, 75, 67.5, 75, 20);
    ctx.closePath();
    ctx.fillStyle = '#dedede';
    ctx.fill();
    ctx.fillRect(65, 100, 50, 50);
    //mani e piedi
    mani = new Path2D();
    mani.arc(56, 120, 8, 2 * Math.PI, Math.PI);
    mani.arc(124, 120, 8, 2 * Math.PI, Math.PI);
    piedi = new Path2D();
    piedi.arc(78, 150, 12.5, 2 * Math.PI, Math.PI);
    piedi.arc(102, 150, 12.5, 2 * Math.PI, Math.PI);
    ctx.fillStyle = '#5491e8';
    ctx.fill(mani);
    ctx.fill(piedi);
    //dettagli della tuta
    loghino = new Path2D();
    loghino.arc(105, 90, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill(loghino);
    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 2.5;
    //linea orizzontale pantaloni
    ctx.beginPath();
    ctx.moveTo(115, 120);
    ctx.lineTo(65, 120);
    ctx.stroke();
    ctx.beginPath();
    //linea verticale pantaloni
    ctx.moveTo(90, 150);
    ctx.lineTo(90, 125);
    ctx.stroke();
    ctx.beginPath();
    //linee maniche
    ctx.moveTo(64, 90);
    ctx.lineTo(64, 120);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(116, 90);
    ctx.lineTo(116, 120);
    ctx.stroke();
}