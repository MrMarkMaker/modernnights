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
  
  /* Map */
  const map = [
    { name: 'Civic Center', 
      level: '5',
      latitude: 37.7778532,
      longitude: -122.4222458,
      description: "The Civic Center's wealth of dominant government and cultural institutions is a prize to Kindred hungry for power and prestige. Ornate, beaux-arts facades and luxurious institutions command the streets, standing out against the ubiquitous Victorian brownstones and stucco-faced apartments. City Hall is an arresting sight in its height and grandeur, its green, baroque dome inspired by Parisian churches and accented with gold. UN plaza, a vast space laid with red brick, carves a purposeful path towards it. A massive fountain fires a constant volley of water from its decorative pool next to the BART station on Market street, attracting a veritable zoo of gulls and pigeons.",
      establishments: [
        {
          name: 'City Hall', 
          level: 3,
          description: 'This is city hall dscription.'
        },
        {
          name: 'Performing Arts Center',
          level: 3,
          description: 'FloridaMan to the rescue.'
        },
      ]
    },
    {
      name: 'Presidio',
      latitude: 37.7989743,
      longitude: -122.474963
    },
    {
      name: 'Financial District',
      latitude: 37.7927731,
      longitude: -122.4054803
    },
    {
      name: 'Chinatown',
      latitude: 37.7940865,
      longitude: -122.4115197
    },
    {
      name: 'The Richmond',
      latitude: 37.7796725,
      longitude: -122.4916832
    },
    {
      name: 'South of Market',
      latitude: 37.7808144,
      longitude: -122.4199706
    },
    {
      name: 'The Sunset',
      latitude: 37.7500379,
      longitude: -122.501618
    },
    {
      name: 'The Castro',
      latitude: 37.7625247,
      longitude: -122.4405557
    },
    {
      name: 'The Mission',
      latitude: 37.7599043,
      longitude: -122.425623
    },
    {
      name: 'Golden Gate Park',
      latitude: 37.7694208,
      longitude: -122.4884078,
    },
    {
      name: 'Portrero Hill',
      latitude: 37.7582657,
      longitude: -122.4014102,
    },
    {
      name: 'North Beach',
      latitude: 37.8047121,
      longitude: -122.4125845
    },
    {
      name: 'Bayview-Hunters Point',
      latitude: 37.7278637,
      longitude: -122.3904264
    },
    {
      name: 'West Oakland',
      latitude: 37.8125262,
      longitude: -122.3093823
    },
    { 
      name: 'The Tenderloin',
      description: "The Tenderloin is a hard-boiled red light district which has been there and done that, its streets long harboring alternative and criminal lifestyles: a veritable buffet for the undead. A chaotic tangle of fire escapes and pipes climb up along the Tenderloin's endless collection of single-room-occupancy hotels. These buildings are havens for parolees and vagrants. They loom above the weathered pavement, powerful structures made of thick, brick walls and deep-set windows with arched lintels. Lighting the cityscape are the colors of art-deco blade signs, in vibrant red or ghostly blue. Their 1920s look lends a touch of noir to this gritty den.", 
      latitude: 37.7839295,
      longitude: -122.4174405,
      establishments: 
      
      [
        { name: 'Oddjob' }
      ]
    },
    { 
      name: 'Haight Ashbury',
      latitude: 37.7699936,
      longitude: -122.4492284
    }
  ];
  
  const makeEstablishment = function( establishments, parentplace ){
    
    establishments.forEach( function( establishment ){
      
      models.Holding.findOrCreate({
        where: {
          name: establishment.name,
          level: establishment.level,
          description: establishment.description
        }
      })
      .spread( function ( newplace ){
        models.Establishment.findOrCreate( 
        { 
          where: {
            holding_id: newplace.id,
            area_id: parentplace
          }
        })
      })
    });
  };
  
  const fillMapEntries = function( mapsquares ){
    map.forEach( function( mapsquare ){
      models.Holding.findOrCreate({
        where: {
          name: mapsquare.name,
          level: mapsquare.level,
          description: mapsquare.description,
          latitude: mapsquare.latitude,
          longitude: mapsquare.longitude
        }
      })
      .spread( function( created ){   
      
        models.Area.findOrCreate({
          where: { holding_id: created.id }
        });
      
        if( mapsquare.establishments ){
          makeEstablishment( mapsquare.establishments , created.id );
        }
      })
    })   
  };
  
  fillMapEntries( map );
  
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
        { name: 'backgrounds',
          stats: [
            'Haven',
            'Retainer',
            'Allies',
            'Contacts',
            'Fame',
            'Influence',
            'Resources',
            'Generation',
            'Herd',
            'Rituals',
            'Black Hand Membership',
            'Majordomo',
            'Family Member'
          ],
        },
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
  
  const monsters = [
    { 
      name: 'Vampire',
      attribute_spread_id: 1,
      ability_spread_id: 3,
      power_spread_id: 5,
      powers: [{name: 'Dominate'}, {name: 'Celerity'}],
      children: [
        {
        name: 'Assamite',
        children: [
        {name:'Sorcerer'}, {name:'Vizier'}, {name:'Warrior'}]
        },
        {
          name: 'Brujah',
          powers: [{name:'Presence'}, {name:'Potence'}, {name:'Celerity'}]
        },
        {
          name: 'Cappadocian',
          children: [{name:'Samedi'}, {name:'Harbinger of Skulls'}]
        },
        {
          name: 'Gangrel',
          children: [{name:'Coyote'}, {name:'Outlander'}]
        },
        {
          name: 'Gargoyle',
        },
        {
          name: 'Lasombra',
          children: [{name:'Lasombra'}, {name:'Kiasyd'}]
        },
        {
          name: 'Malkavian',
          children: [{name:'Malkavian'}, {name:'Ananke'}, {name:'Knight Of The Moon'}]
        },
        {
          name: 'Nosferatu',
        },
        {
          name: 'Ravnos',
        },
        {
          name: 'Salubri',
          children: [{name:'Healer'},{name:'Fury'}]
        },
        {
          name: 'Setite',
          children: [{name:'Follower of Set'}, {name:'Serpent of the Light'}]
        },
        {
          name: 'Toreador',
          children: [{name:'Volgirre'},{name:'Ishtarri'},{name:'Toreador'}]
        },
        {
          name:'Tremere',
          monsters:[{name:'Tremere'},{name:'Telyav'}]
        },
        {
          name: 'Tzimisce',
        },
        {
          name: 'Ventrue',
          children: [{name:'Ventrue'},{name:'Crusader'}]
        }
      ]
    },
    {
      name: 'Ghoul',
      attribute_spread_id: 2,
      ability_spread_id: 3,
      power_spread_id: 8
    },
    {
      name: 'Revenant',
      attribute_spread_id: 2,
      ability_spread_id: 3,
      power_spread_id: 8,
      children: [{name: 'Obertus'}, {name:'Bratovich'}, {name:'Grimaldi'}, {name:'Zantosa'}, {name:'Ducheski'}]
    }
  ];
  
  const addMonster = function( monster,id ){
    addMonsters( monster, id );
  };
  
  const addMonsters = function( monsters, id ){
    monsters.forEach( function( monster ){
      models.Monster.findOrCreate({
        where: {
          name: monster.name,
          parentId: id
        }
      })
      .spread( function( created ){   
        if( monster.children ){
          addMonster( monster.children , created.id );
        }
        
      })
    })   
  };
  
  const addPower = function( power ){
    addPowers( power )
  };
  
  const addPowers = function( monsters ){
  //Associate the powers and monsters 
  }
  
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
  
  const createChargenData = function( monsterlist, statlist ){
    var createStats = new Promise( function( resolve, reject ){
      addTypes( statlist );
    });
    
    var createMonsters = new Promise( function( resolve, reject ){
      addMonsters( monsterlist, null );
    });
    
    createStats
    .then( function(){
      createMonsters
      .then( function(){
        addPowers( monsterlist );
      });      
    });
  } 
  
  createChargenData( monsters, stats );
 
  
  
  /*
  Table1.find({…}).
  then(function(a_thing_from_table_1){
    Table2.find({…}).
    then(function(a_thing_from_table_2){
      a_thing_from_table_1.addTable2(a_thing_from_table_2); 
    }) 
  })  
  */
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