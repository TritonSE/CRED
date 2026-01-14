/**
 * admin file
 */

import { Table } from "@tritonse/tse-constellation";

export type ApplicationTableProps = {
  title: string;
};

export function ApplicationTable({ title }: ApplicationTableProps) {
  return (
    <Table
      columns={[
        {
          accessorKey: "name",
          header: "Name",
        },
        {
          accessorKey: "abbreviation",
          header: "Abbr.",
        },
        {
          accessorKey: "stars",
          header: "# of Stars",
        },
        {
          accessorKey: "shape",
          header: "Shape",
        },
        {
          accessorKey: "brightest_star",
          header: "Brightest Star",
        },
      ]}
      data={[
        {
          abbreviation: "Ori",
          brightest_star: "Rigel",
          name: "Orion",
          shape: "Hunter",
          stars: 7,
        },
        {
          abbreviation: "UMa",
          brightest_star: "Dubhe",
          name: "Ursa Major",
          shape: "Great Bear",
          stars: 7,
        },
        {
          abbreviation: "Leo",
          brightest_star: "Regulus",
          name: "Leo",
          shape: "Lion",
          stars: 9,
        },
        {
          abbreviation: "Peg",
          brightest_star: "Markab",
          name: "Pegasus",
          shape: "Winged Horse",
          stars: 8,
        },
        {
          abbreviation: "Cas",
          brightest_star: "Schedar",
          name: "Cassiopeia",
          shape: "Queen",
          stars: 5,
        },
        {
          abbreviation: "Sco",
          brightest_star: "Antares",
          name: "Scorpius",
          shape: "Scorpion",
          stars: 18,
        },
        {
          abbreviation: "Gem",
          brightest_star: "Pollux",
          name: "Gemini",
          shape: "Twins",
          stars: 6,
        },
        {
          abbreviation: "Tau",
          brightest_star: "Aldebaran",
          name: "Taurus",
          shape: "Bull",
          stars: 7,
        },
        {
          abbreviation: "Aqr",
          brightest_star: "Sadalsuud",
          name: "Aquarius",
          shape: "Water Bearer",
          stars: 6,
        },
        {
          abbreviation: "Ari",
          brightest_star: "Hamal",
          name: "Aries",
          shape: "Ram",
          stars: 7,
        },
        {
          abbreviation: "Vir",
          brightest_star: "Spica",
          name: "Virgo",
          shape: "Virgin",
          stars: 11,
        },
        {
          abbreviation: "Sgr",
          brightest_star: "Kaus Australis",
          name: "Sagittarius",
          shape: "Archer",
          stars: 13,
        },
        {
          abbreviation: "Cap",
          brightest_star: "Deneb Algedi",
          name: "Capricornus",
          shape: "Sea Goat",
          stars: 6,
        },
        {
          abbreviation: "Lib",
          brightest_star: "Zubenelgenubi",
          name: "Libra",
          shape: "Scales",
          stars: 5,
        },
        {
          abbreviation: "Psc",
          brightest_star: "Epsilon Piscium",
          name: "Pisces",
          shape: "Fish",
          stars: 9,
        },
        {
          abbreviation: "CMa",
          brightest_star: "Sirius",
          name: "Canis Major",
          shape: "Great Dog",
          stars: 7,
        },
        {
          abbreviation: "Per",
          brightest_star: "Mirfak",
          name: "Perseus",
          shape: "Hero",
          stars: 6,
        },
        {
          abbreviation: "And",
          brightest_star: "Alpheratz",
          name: "Andromeda",
          shape: "Princess",
          stars: 7,
        },
        {
          abbreviation: "Her",
          brightest_star: "Rasalgethi",
          name: "Hercules",
          shape: "Hero",
          stars: 7,
        },
      ]}
    />
  );
}
