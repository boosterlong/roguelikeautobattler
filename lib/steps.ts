// A step is a single thing moment in a fight
// It one or more things happening and should show to the user:
//  - One or more lines added to the battle log (Tim used fireball. He roll 5+4+1)
//  - Make 0 to infinite changes to the battle state (hp, buffs, etc)
// Duration is how long to wait to let the effect sink in, and/or to play animations

export type Duration = 'instant' | 'fast' | 'slow'

export type Step = {
	msg: string
	duration: Duration
}
