var serverSystem = server.registerSystem(0, 0);
const displaychat = "minecraft:display_chat_event";

// Setup which events to listen for
serverSystem.initialize = function () {
    // set up your listenToEvents and register server-side components here.
    this.listenForEvent("minecraft:player_attacked_actor", (eventData) => this.spawnParticle(eventData));
}

// per-tick updates
serverSystem.update = function() {
    // Any logic that needs to happen every tick on the server.
}

serverSystem.spawnParticle = function(eventData){

    const entity = eventData.attacked_entity;
    var entityPos = this.getComponent(entity, "minecraft:position");
    var customParticle = {
        'effect' : "minecraft:mobflame_emitter",
        'dimension' : "overworld",
        'position' : {x : entityPos.x, y : entityPos.y , z : entityPos.z }
    };
    this.broadcastEvent("minecraft:spawn_particle_in_world", customParticle);
    this.broadcastEvent(displaychat, "§6Particle effect spawned at entity location.");
}