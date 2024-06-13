export interface DataList {
  name: string;
  url: string;
  favorite: boolean;
}
export interface RelevantData {
  name: string | '';
  id: number | 0;
  base_experience: number | 0;
  height: number | 0;
  weight: number | 0;
  types: string | '';
  abilities: string | '';
  sprite: string | '';
  stats: Stat[] | [];
}
export interface StatRow {
  base_stat: number;
  effort: number;
  name: string;
}
export interface DataItem {
  abilities: Ability[];
  base_experience: number;
  cries: Cries;
  forms: Gobal[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItems[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: string[];
  past_types: PastTypes[];
  species: Gobal;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}
export interface ListInitial {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export interface DataItem {
  abilities: Ability[];
  base_experience: number;
  cries: Cries;
  forms: Gobal[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItems[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: string[];
  past_types: PastTypes[];
  species: Gobal;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface GenerationL {
  id: number;
  name: string;
  abilities: Ability[];
  main_region: MainRegion;
  moves: MainRegion[];
  names: Name[];
  pokemon_species: MainRegion[];
  types: MainRegion[];
  version_groups: MainRegion[];
}
export interface Ability {
  id: number;
  name: string;
  is_main_series: boolean;
  descriptions: Description;
  names: Name;
  effect_entries: VerboseEffect;
  effect_changes: AbilityEffectChange;
  flavor_text_entries: AbilityFlavorText;
  pokemon: Ability;
}
export interface AbilityFlavorText {
  flavor_text: string;
  language: Language;
  version_group: VersionGroupL;
}
export interface AbilityEffectChange {
  effect_entries: Effect;
  version_group: VersionGroupL;
}

export interface VersionGroupL {
  id: number;
  name: string;
  order: number;
  generation: Generation;
  move_learn_methods: Generation[];
  pokedexes: Generation[];
  regions: Generation[];
  versions: Generation[];
}

export interface Generation {
  name: string;
  url: string;
}

export interface Effect {
  effect: string;
  language: Language;
}
export interface VerboseEffect {
  effect: string;
  short_effect: string;
  language: Language;
}
export interface Description {
  description: string;
  language: Language;
}

export interface Language {
  id: number;
  name: string;
  official: boolean;
  iso639: string;
  iso3166: string;
  names: Name;
}
export interface MainRegion {
  name: string;
  url: string;
}

export interface Name {
  name: string;
  language: MainRegion;
}

export interface HeldItems {
  item: Gobal;
  version_details: HeldItems_version_details;
}
export interface HeldItems_version_details {
  version: Gobal;
  rarity: number;
}

export interface PastTypes {
  generation: GenerationL;
  types: Type;
}
export interface PastAbilitiesasdasd {
  version: Gobal;
  rarity: number;
}

export interface Ability {
  ability: Gobal;
  is_hidden: boolean;
  slot: number;
}

export interface Gobal {
  name: string;
  url: string;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface GameIndex {
  game_index: number;
  version: Gobal;
}

export interface Move {
  move: Gobal;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Gobal;
  version_group: Gobal;
}

export interface GenerationV {
  'black-white': Sprites;
}

export interface GenerationIv {
  'diamond-pearl': Sprites;
  'heartgold-soulsilver': Sprites;
  platinum: Sprites;
}

export interface Versions {
  'generation-i': GenerationI;
  'generation-ii': GenerationIi;
  'generation-iii': GenerationIii;
  'generation-iv': GenerationIv;
  'generation-v': GenerationV;
  'generation-vi': { [key: string]: Home };
  'generation-vii': GenerationVii;
  'generation-viii': GenerationViii;
}

export interface Other {
  dream_world: DreamWorld;
  home: Home;
  'official-artwork': OfficialArtwork;
  showdown: Sprites;
}

export interface Sprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  other?: Other;
  versions?: Versions;
  animated?: Sprites;
}

export interface GenerationI {
  'red-blue': RedBlue;
  yellow: RedBlue;
}

export interface RedBlue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Gold;
  silver: Gold;
}

export interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

export interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent?: string;
}

export interface GenerationIii {
  emerald: OfficialArtwork;
  'firered-leafgreen': Gold;
  'ruby-sapphire': Gold;
}

export interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

export interface Home {
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

export interface GenerationVii {
  icons: DreamWorld;
  'ultra-sun-ultra-moon': Home;
}

export interface DreamWorld {
  front_default: string;
  front_female: null;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Gobal;
}

export interface Type {
  slot: number;
  type: Gobal;
}
