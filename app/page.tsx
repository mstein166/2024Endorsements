"use client"

import { useState } from 'react'
import { Search, ChevronUp, ChevronDown } from 'lucide-react'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Celebrity = {
  name: string
  occupation: string
  endorsement: string
  cardColor: 'red' | 'blue'
}

const celebrities: Celebrity[] = [
  {
    name: "Taylor Swift",
    occupation: "Musician",
    endorsement: "Taylor Swift endorsed Harris on Sept. 10th, 2024, announcing her support via Instagram post following the debate between Trump & Harris.",
    cardColor: 'blue'
  },
  {
    name: "Hulk Hogan",
    occupation: "Wrestler",
    endorsement: "Hulk Hogan endorsed Trump on July 18th, 2024, during a public speech at the RNC.",
    cardColor: 'red'
  },

  {
    name: "Jennifer Lawrence",
    occupation: "Actress",
    endorsement: "Jennifer Lawrence endorsed Harris in an interview with People magazine published September 24th, 2024, citing abortion as the main reason.",
    cardColor: 'blue'
  },

  {
    name: "Elon Musk",
    occupation: "Entrepreneur",
    endorsement: "Elon Musk endorsed Trump via X on July 14th, the day following an assassination attempt on the former president's life.",
    cardColor: 'red'
  },

  {
    name: "Billie Eilish",
    occupation: "Musician",
    endorsement: "Billie Eilish endorsed Harris via Instagram on Sept. 17th, National Voter registration Day",
    cardColor: 'blue'
  },

  {
    name: "George Clooney",
    occupation: "Actor",
    endorsement: "George Clooney endorsed Harris on July 23rd in a statement to CNN",
    cardColor: 'blue'
  },

  {
    name: "Bruce Springsteen",
    occupation: "Musician",
    endorsement: "Bruce Springsteen endorsed Harris via Instagram on Oct.3",
    cardColor: 'blue'
  },
  // Add more celebrities here
]

export default function Endorsed() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})
  const [occupationFilter, setOccupationFilter] = useState<string | null>(null)
  const [endorsementFilter, setEndorsementFilter] = useState<string | null>(null)

  const toggleCard = (name: string) => {
    setExpandedCards(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const filteredCelebrities = celebrities.filter(celeb =>
    celeb.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (occupationFilter === null || occupationFilter === "all" || celeb.occupation === occupationFilter) &&
    (endorsementFilter === null || endorsementFilter === "all" || celeb.cardColor === endorsementFilter)
  )

  const uniqueOccupations = Array.from(new Set(celebrities.map(celeb => celeb.occupation)))

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 animate-fade text-white">Endorsed</h1>

      {/* Search and filter section */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search for a celebrity!"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-100"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Select value={occupationFilter || undefined} onValueChange={setOccupationFilter}>
          <SelectTrigger className="w-full md:w-[200px] bg-white">
            <SelectValue placeholder="Filter by occupation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All occupations</SelectItem>
            {uniqueOccupations.map(occupation => (
              <SelectItem key={occupation} value={occupation}>{occupation}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={endorsementFilter || undefined} onValueChange={setEndorsementFilter}>
          <SelectTrigger className="w-full md:w-[200px] bg-white">
            <SelectValue placeholder="Filter by endorsement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All endorsements</SelectItem>
            <SelectItem value="blue">Democrat</SelectItem>
            <SelectItem value="red">Republican</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="mb-4 text-white">
        Curious who your favorite (or least favorite) celebrity has endorsed for president?
        So were we! Check out the list below - or search for a specific name. You can also
        filter by type of celebrity or candidate they've endorsed!
        <br />
        <br />
        Most importantly though, remember that your vote is your own & it's your decision who to vote for.
      </p>
      <div className="space-y-4">
        {filteredCelebrities.map((celeb, index) => (
          <Card
            key={index}
            className={`${celeb.cardColor === 'blue' ? 'bg-blue-300' : 'bg-red-300'} transition-all duration-300`}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white mr-2">
                    <span className="sr-only">{celeb.name}'s initial</span>
                    {celeb.name[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{celeb.name}</h3>
                    <p className="text-sm text-gray-600">{celeb.occupation}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleCard(celeb.name)}
                  aria-expanded={expandedCards[celeb.name]}
                  aria-label={expandedCards[celeb.name] ? "Collapse details" : "Expand details"}
                >
                  {expandedCards[celeb.name] ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </CardTitle>
            </CardHeader>
            {expandedCards[celeb.name] && (
              <CardContent>
                <p>{celeb.endorsement}</p>
              </CardContent>
            )}
          </Card>
        ))}
        <div>
          <h1 className="mb-4 text-white">Comments or suggestions? Email me at mstein166@gmail.com.
            <br />
            <br />
            Please provide documented evidence - article links, tweets, etc. - for any submissions you would like to see.</h1>
        </div>
      </div>
    </div>
  )
}