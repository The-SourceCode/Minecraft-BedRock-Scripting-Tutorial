let serverSystem = server.registerSystem(0, 0);
const displaychat = "minecraft:display_chat_event";
let customZombie;
let id;
// Setup which events to listen for
serverSystem.initialize = function () {
    // set up your listenToEvents and register server-side components here.
    this.listenForEvent("minecraft:player_attacked_actor", (eventData) => this.spawnEntity(eventData))
    this.listenForEvent("minecraft:entity_death", (eventData) => this.onEntityDeath(eventData))
}

// per-tick updates
serverSystem.update = function() {
    // Any logic that needs to happen every tick on the server.
}

serverSystem.onEntityDeath = function(eventData){
    let entity = eventData.entity
    if(id == entity.id){
        this.broadcastEvent(displaychat, "§6You have slain your custom entity. A new one may spawn!")
        customZombie = null
        id = null
    }

}

serverSystem.spawnEntity = function(eventData){
    if(customZombie == null){
        customZombie = this.createEntity("entity", "minecraft:zombie")
        id = customZombie.id
        let zombieName = this.createComponent(customZombie, "minecraft:nameable")
        zombieName.alwaysShow = true
        zombieName.name = "§cScary Zombie"
        this.applyComponentChanges(customZombie, zombieName)
        this.broadcastEvent(displaychat, `§aA custom zombie has spawned with id: §2${customZombie.id}`)
    }
}

