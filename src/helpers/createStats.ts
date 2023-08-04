type NoteType = {
    name: string
    category: string
    content: string
    created: Date
    dates: string
    archived: boolean
}

type CategoryStatsType = {
    category: string
    activeCount: number
    archivedCount: number
}
const createStats = (notes: any): CategoryStatsType[] => {
    const categories: string[] = ['Task', 'Idea', 'Quote', 'Random Thought']
    const stats: CategoryStatsType[] = []

    categories.forEach((category) => {
        const filteredNotes = notes.filter((note: NoteType) => note.category === category)
        const activeCount = filteredNotes.filter((note : NoteType) => !note.archived).length
        const archivedCount = filteredNotes.filter((note : NoteType) => note.archived).length

        stats.push({
            category,
            activeCount,
            archivedCount,
        })
    })

    return stats
}

export default createStats