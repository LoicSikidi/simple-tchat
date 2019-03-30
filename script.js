
    var socket = io.connect('http://localhost:8090');

    socket.on('connection_success', function(message) {
        console.log('connection success');
    })

    // On demande le pseudo au visiteur...
    var pseudo = prompt('Quel est votre pseudo ?');
    // Et on l'envoie avec le signal "petit_nouveau" (pour le différencier de "message")
    socket.emit('new_user', pseudo);

    // On affiche une boîte de dialogue quand le serveur nous envoie un "message"
    socket.on('new_user', function() {
        alert('Un autre client vient de se connecter !');
    })

    socket.on('new_post', function(message) {
        $("#messages").append(`<li><bold>${message.emitter} : <bold><span class="tab">${message.message}</span></li>`);
    })


    // Lorsqu'on clique sur le bouton, on envoie un "message" au serveur
    $('#submit').click(function () {
        const message = $('#post').val();
        socket.emit('message', message);
        $('#post').val("");
        $("#messages").append(`<li><bold>${pseudo} : <bold><span class="tab">${message}</span></li>`);
    })