let clientSystem = client.registerSystem(0, 0);
const displaychat = "minecraft:display_chat_event";
// Setup which events to listen for
clientSystem.initialize = function () {
    // set up your listenToEvents and register client-side components here.
    this.listenForEvent("minecraft:client_entered_world", (eventData) => this.clientJoined(eventData));
}


clientSystem.clientJoined = function(eventData){
    this.broadcastEvent(displaychat, "§aLoaded...");
}
// per-tick updates
clientSystem.update = function() {
    // Any logic that needs to happen every tick on the client.
}