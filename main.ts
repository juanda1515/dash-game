namespace SpriteKind {
    export const Spike = SpriteKind.create()
    export const Face = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    newSpike = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 9 . . . . . . . . 
        . . . . . . . 9 . . . . . . . . 
        . . . . . . 9 3 9 . . . . . . . 
        . . . . . . 9 9 9 . . . . . . . 
        . . . . . 9 9 3 9 9 . . . . . . 
        . . . . . 9 3 9 9 9 . . . . . . 
        . . . . 9 3 9 3 9 9 9 . . . . . 
        . . . . 9 9 3 9 9 9 9 . . . . . 
        . . . 9 9 3 9 3 9 9 9 9 . . . . 
        . . . 9 3 9 3 9 9 9 9 9 . . . . 
        . . 9 3 9 3 9 3 9 9 9 9 9 . . . 
        . . 9 9 3 9 3 9 9 9 9 9 9 . . . 
        . 9 9 3 9 3 9 9 9 9 9 9 9 9 . . 
        . 9 9 9 9 9 9 9 9 9 9 9 9 9 . . 
        `, SpriteKind.Spike)
    newSpike.setFlag(SpriteFlag.AutoDestroy, true)
    tiles.setTileAt(location, assets.tile`myTile0`)
    tiles.placeOnTile(newSpike, location)
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    jumping = false
    if (currentFrameIndex % 4 == 1) {
        currentFrameIndex = (currentFrameIndex - 1) % 16
        the_players_face.setImage(frames[currentFrameIndex])
    } else {
        while (currentFrameIndex % 4 != 0) {
            currentFrameIndex = (currentFrameIndex + 1) % 16
            the_players_face.setImage(frames[currentFrameIndex])
        }
    }
    if (tiles.tileAtLocationEquals(location, assets.tile`myTile5`)) {
        if (currentlyNormalStyleGravity) {
            thePlayer.vy = 0 - Math.sqrt(2 * (gravity * jellyJumpHeight))
        } else {
            thePlayer.vy = Math.sqrt(2 * (gravity * jellyJumpHeight))
        }
    }
    if (tiles.tileAtLocationEquals(location, assets.tile`myTile6`)) {
        changeGravity(false)
    }
    if (tiles.tileAtLocationEquals(location, assets.tile`myTile7`)) {
        changeGravity(true)
    }
})
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentlyNormalStyleGravity) {
        if (thePlayer.isHittingTile(CollisionDirection.Bottom)) {
            thePlayer.vy = 0 - Math.sqrt(2 * (gravity * jumpHeight))
        }
    } else {
        if (thePlayer.isHittingTile(CollisionDirection.Top)) {
            thePlayer.vy = Math.sqrt(2 * (gravity * jumpHeight))
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    game.over(false)
})
function changeGravity (gravityIsNormalStyle: boolean) {
    if (gravityIsNormalStyle == currentlyNormalStyleGravity) {
        return
    } else {
        currentlyNormalStyleGravity = gravityIsNormalStyle
        thePlayer.ay = 0 - thePlayer.ay
        thePlayer.vy = 0
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    newSpike = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . 9 9 9 9 9 9 9 9 9 9 9 9 9 . . 
        . 9 9 3 9 3 9 9 9 9 9 9 9 9 . . 
        . . 9 9 3 9 3 9 9 9 9 9 9 . . . 
        . . 9 3 9 3 9 3 9 9 9 9 9 . . . 
        . . . 9 3 9 3 9 9 9 9 9 . . . . 
        . . . 9 9 3 9 3 9 9 9 9 . . . . 
        . . . . 9 9 3 9 9 9 9 . . . . . 
        . . . . 9 3 9 3 9 9 9 . . . . . 
        . . . . . 9 3 9 9 9 . . . . . . 
        . . . . . 9 9 3 9 9 . . . . . . 
        . . . . . . 9 9 9 . . . . . . . 
        . . . . . . 9 3 9 . . . . . . . 
        . . . . . . . 9 . . . . . . . . 
        . . . . . . . 9 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Spike)
    newSpike.setFlag(SpriteFlag.AutoDestroy, true)
    tiles.setTileAt(location, assets.tile`myTile0`)
    tiles.placeOnTile(newSpike, location)
})
sprites.onOverlap(SpriteKind.Face, SpriteKind.Spike, function (sprite, otherSprite) {
    game.over(false)
})
let onGround = false
let newSpike: Sprite = null
let currentlyNormalStyleGravity = false
let jumping = false
let currentFrameIndex = 0
let the_players_face: Sprite = null
let frames: Image[] = []
let thePlayer: Sprite = null
let jellyJumpHeight = 0
let jumpHeight = 0
let gravity = 0
gravity = 500
let moveSpeed = 100
jumpHeight = 33
jellyJumpHeight = 49
tiles.setTilemap(tilemap`level1`)
thePlayer = sprites.create(img`
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 1 1 1 7 7 7 7 1 1 1 7 7 
    7 7 1 1 1 7 7 7 7 1 1 1 7 7 
    7 7 1 1 1 7 7 7 7 1 1 1 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 1 1 1 1 1 1 1 1 1 1 7 7 
    7 1 1 1 1 1 1 1 1 1 1 1 1 7 
    7 1 1 1 1 1 1 1 1 1 1 1 1 7 
    7 7 1 1 1 1 1 1 1 1 1 1 7 7 
    7 7 7 7 1 1 1 1 1 1 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    `, SpriteKind.Player)
thePlayer.ay = gravity
scene.cameraFollowSprite(thePlayer)
thePlayer.setVelocity(100, 0)
thePlayer.setFlag(SpriteFlag.Invisible, true)
frames = scaling.createRotations(thePlayer.image, 16)
the_players_face = sprites.create(img`
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 1 1 1 7 7 7 7 1 1 1 7 7 
    7 7 1 1 1 7 7 7 7 1 1 1 7 7 
    7 7 1 1 1 7 7 7 7 1 1 1 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 1 1 1 1 1 1 1 1 1 1 7 7 
    7 1 1 1 1 1 1 1 1 1 1 1 1 7 
    7 1 1 1 1 1 1 1 1 1 1 1 1 7 
    7 7 1 1 1 1 1 1 1 1 1 1 7 7 
    7 7 7 7 1 1 1 1 1 1 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    `, SpriteKind.Face)
the_players_face.setFlag(SpriteFlag.GhostThroughWalls, true)
currentFrameIndex = 0
jumping = false
currentlyNormalStyleGravity = true
game.onUpdate(function () {
    if (currentlyNormalStyleGravity) {
        onGround = thePlayer.isHittingTile(CollisionDirection.Bottom)
    } else {
        onGround = thePlayer.isHittingTile(CollisionDirection.Top)
    }
    the_players_face.setPosition(thePlayer.x, thePlayer.y)
    if (thePlayer.vx == 0) {
        game.over(false)
    }
})
game.onUpdateInterval(50, function () {
    if (!(onGround)) {
        currentFrameIndex = (currentFrameIndex + 1) % 16
        the_players_face.setImage(frames[currentFrameIndex])
    }
})
