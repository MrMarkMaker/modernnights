'use strict';

module.exports = function( models ) {
  /* Permissions */
  models.Permission.findOrCreate({ 
    where: {
      name: 'Mortal',
      readAll: false,
      writeAll: false,
    }
  });
  models.Permission.findOrCreate({
    where: {
      name: 'Royalty',
      readAll: true,
      writeAll: false,
    }
  });
  models.Permission.findOrCreate({
    where: {
      name: 'Wizard',
      readAll: true,
      writeAll: true,
    }
  });
  /* Archetypes */
  const archetypes = [
    'Architect',
    'Autocrat',
    'Bon Vivant',
    'Bravo',
    'Capitalist',
    'Caregiver',
    'Celebrant',
    'Chameleon',
    'Child',
    'Competitor',
    'Conformist',
    'Conniver',
    'Creep Show',
    'Curmudgeon',
    'Dabbler',
    'Deviant',
    'Director',
    'Enigma',
    'Eye of the Storm',
    'Fanatic',
    'Gallant',
    'Guru',
    'Idealist',
    'Judge',
    'Loner',
    'Martyr',
    'Masochist',
    'Monster',
    'Pedagogue',
    'Penitent',
    'Perfectionist',
    'Rebel',
    'Rogue',
    'Sadist',
    'Scientist',
    'Sociopath',
    'Soldier',
    'Survivor',
    'Thrill-seeker',
    'Traditionalist',
    'Trickster',
    'Visionary'
  ];
  archetypes.forEach( function( archetype ) {
    models.Archetype.findOrCreate({
      where: {
        name: archetype
      }
    });
  })

  
  // todo: bulk-add stat types
  const stats = [
    {
      name: 'attributes',
      rest: [
        { 
          name: 'physical',
          stats: [
            {
              name: 'strength',
              rarity: 0,
            },
            {
              name: 'dexterity',
              rarity: 0,
            },
            {
              name: 'stamina',
              rarity: 0,
            },
          ],
        },
        {
          name: 'social',
          stats: [
            {
              name: 'charisma',
              rarity: 0,
            },
            {
              name: 'manipulation',
              rarity: 0,
            },
            {
              name: 'appearance',
              rarity: 0,
            },
          ],
        },
        {
          name: 'mental',
          stats: [
            {
              name: 'perception',
              rarity: 0,
            },
            {
              name: 'intelligence',
              rarity: 0,
            },
            {
              name: 'wits',
              rarity: 0,
            },
          ],
        }
      ]
    },
    {
      name: 'abilities',
      rest: [
        {
          name: 'talents',
          stats: [
            'alertness',
            'athletics',
            'awareness',
            'brawl',
            'empathy',
            'expression',
            'intimidation',
            'leadership',
            'streetwise',
            'subterfuge'
          ],
        },
        {
          name: 'skills',
          stats: [
            'animal ken',
            'crafts',
            'drive',
            'etiquette',
            'firearms',
            'larceny',
            'melee',
            'performance',
            'stealth',
            'survival'
          ],
        },
        {
          name: 'knowledges',
          stats: [
            'academics',
            'computer',
            'finance',
            'investigation',
            'law',
            'medicine',
            'occult',
            'politics',
            'science',
            'technology'
          ],
        }
      ]
    },
    {
      name: 'advantages',
      rest: [
        { name: 'backgrounds' },
        {
          name: 'virtues',
          stats: [
            'conscience',
            'self-control',
            'courage',
            'conviction',
            'instinct'
          ],
        },
        { 
          name: 'powers',
          rest: [
            {
              name: 'disciplines',
              stats: [
                { name: 'abombwe', rarity: 11 },
                'animalism',
                'auspex',
                { name: 'bardo', rarity: 11 },
                'celerity',
                'chimerstry',
                { name: 'daimonion', rarity: 11 },
                'dementation',
                'dominate',
                { name: 'flight', rarity: 11 },
                'fortitude',
                { name: 'melpominee', rarity: 11 },
                { name: 'mytherceria', rarity: 11 },
                'necromancy',
                { name: 'obeah', rarity: 11 },
                'obfuscate',
                'obtenebration',
                'potence',
                'presence',
                'protean',
                'quietus',
                { name: 'sanguinus', rarity: 11 },
                'serpentis',
                { name: 'spiritus', rarity: 11 },
                { name: 'temporis', rarity: 11 },
                { name: 'thanatosis', rarity: 11 },
                'thaumaturgy',
                'valeren',
                'vicissitude',
                'visceratika',
              ],
            },
            {
              name: 'thaumaturgy paths',
              stats: [
                'the path of blood',
              ],
            },
            {
              name: 'thaumaturgy rituals',
              rest: [
                {
                  name: 'thaumaturgy rituals 1',
                  stats: [
                    'bind the accusing tongue',
                  ],
                },
                {
                  name: 'thaumaturgy rituals 2',
                  stats: [
                    'blood walk',
                  ],
                },
                {
                  name: 'thaumaturgy rituals 3',
                  stats: [
                    'amulet of mnemosyne',
                  ],
                },
                {
                  name: 'thaumaturgy rituals 4',
                  stats: [
                    'bone of lies',
                  ],
                },
                {
                  name: 'thaumaturgy rituals 5',
                  stats: [
                    'abandon the fetters',
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'quirks',
          rest: [
            { 
              name: 'merits',
              stats: [
                'acute hearing',
                'common sense',
                'harmless',
                'deceptive aura',
              ]
            },
            { 
              name: 'flaws',
              stats: [
                'bad sight',
                'nightmares',
                'dark secret',
                'repulsed by garlic',
              ],
            },
          ],
        },
      ],
    },
  ];
  const addStat = function( type, stat ) {
    const id = type.get( 'id' );

    models.Stat.findOrCreate({
      where: {
        name: stat.name || stat,
        stat_type_id: id,
        rarity: stat.rarity || 0,
      }
    })
  };
  const addTypes = function( types, prevID ) {
    // TODO: Refactor forEaches to use promise.each
    types.forEach( function( type ) {
        models.StatType.findOrCreateNode({
        where: {
          name: type.name,
          parent_type_id: prevID,
        }
      })
      .then( function( instance ) {
        if( type.rest ) {
          addTypes( type.rest, instance.get('id') );
        }
        if( type.stats ) {
          type.stats.forEach( function( stat ) {
            addStat( instance, stat );
          });
        }
      })
    });
  }
  addTypes( stats, null );
  // todo: bulk-add spreads
  const spreads = [
    [7, 5, 3],
    [6, 4, 3],
    [13, 9, 5],
    [11, 7, 4],
    [3, 0, 0],
    [4, 0, 0],
    [5, 0, 0],
    [2, 0, 0]
  ];
  
  spreads.forEach( function( spread ) {
    models.Spread.findOrCreate({
      where: {
        primary: spread[0],
        secondary: spread[1],
        tertiary: spread[2]
      }
    })
  });


  models.Character.findOrCreate({
    where: {
      name: 'Bob Ross',
      dbref: '#1',
      xp: 250,
      freebies: 0,
      concept: '',
      path_value: 8,
    },
    includes: [{all: true}]
  }).spread( function( character, created ) {
    models.Pool.findOrCreate({ where: { name: 'Willpower' } })
    .spread( function( pool, created ) {
      models.CharacterPool.findOrCreate( {
        where: {
          character_id: character.get('id'),
          pool_id: pool.get('id'),
          value: 8,
          max: 8,
        }
      });
    });
  })
  // todo: bulk-add monsters
  
  const monsters = [
    {
      name: 'Template',
      rest: [
        { 
          name: 'Vampire',
          rest: [{
            name: 'Clan',
            rest: [
            {
              name: 'Assamite',
              monsters: ['Sorcerer', 'Vizier', 'Warrior']
            },
            {
              name: 'Brujah',
              monsters: ['Brujah']
            },
            {
              name: 'Cappadocian',
              monsters: ['Samedi', 'Harbinger of Skulls']
            },
            {
              name: 'Gangrel',
              monsters: ['Coyote', 'Outlander']
            },
            {
              name: 'Gargoyle',
              monsters:['Gargoyle']
            },
            {
              name: 'Lasombra',
              monsters: ['Lasombra', 'Kiasyd']
            },
            {
              name: 'Malkavian',
              monsters: ['Malkavian', 'Ananke', 'Knight Of The Moon']
            },
            {
              name: 'Nosferatu',
              monsters: ['Nosferatu']
            },
            {
              name: 'Ravnos',
              monsters: ['Ravnos']
            },
            {
              name: 'Salubri',
              monsters: ['Healer','Fury']
            },
            {
              name: 'Setite',
              monsters: ['Follower of Set', 'Serpent of the Light']
            },
            {
              name: 'Toreador',
              monsters: ['Volgirre','Ishtarri','Toreador']
            },
            {
              name:'Tremere',
              monsters:['Tremere','Telyav']
            },
            {
              name: 'Tzimisce',
              monsters: ['Tzimisce']
            },
            {
              name: 'Ventrue',
              monsters: ['Ventrue','Crusader']
            }
            ]
          }]
        },
        {
          name: 'Ghoul'
        },
        {
          name: 'Revenant',
          rest: [{
            name: 'Family',
            monsters: ['Obertus', 'Bratovich', 'Grimaldi', 'Zantosa', 'Ducheski' ]
          }]
        },
      ],
    }
  ];
  
  const addMonster = function( type, monster ) {
    const id = type.get( 'id' );

    models.Monster.findOrCreate({
      where: {
        name: monster.name || monster,
        monster_type_id: id,
        rarity: monster.rarity || 0,
      }
    })
  };
  const addMonsterTypes = function( types, prevID ){
    // TODO: Refactor forEaches to use promise.each
    types.forEach( function( type ) {
        models.MonsterType.findOrCreateNode({
        where: {
          name: type.name,
          parent_monster_id: prevID,
        }
      })
      .then( function( instance ) {
        if( type.rest ) {
          addMonsterTypes( type.rest, instance.get('id') );
        }
        if( type.monsters ) {
          type.monsters.forEach( function( monster ) {
            addMonster( instance, monster );
          });
        }
      })
    });
  }
  addMonsterTypes( monsters, null );
  
    // mortal
      // werewolf
        // subtype
          // subtype
      // vampire
        // clan
          // bloodline
    // Where do ghoul and revenant sit?

  // todo: bulk-add orgs


}