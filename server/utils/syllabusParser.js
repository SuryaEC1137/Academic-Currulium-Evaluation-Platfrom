const pdf = require('pdf-parse');
const fs = require('fs').promises;

/**
 * Keywords for academic topics categorized by general difficulty/complexity.
 */
const ACADEMIC_KEYWORDS = {
    'Advanced': [
        'quantum', 'distributed', 'scalability', 'stochastic', 'advanced',
        'cryptography', 'heuristics', 'optimization', 'neural', 'parallel',
        'compilers', 'robotics', 'bioinformatics', 'complex', 'theoretical'
    ],
    'Intermediate': [
        'algorithm', 'structure', 'database', 'network', 'operating',
        'security', 'calculus', 'statistics', 'probability', 'software',
        'engineering', 'architecture', 'linear', 'discrete', 'logic'
    ],
    'Introductory': [
        'introduction', 'basics', 'fundamental', 'principles', 'primer',
        'essential', 'concepts', 'overview', 'beginners', 'elemental'
    ]
};

/**
 * Extracts text from a PDF file buffer.
 * @param {Buffer} buffer 
 * @returns {Promise<string>}
 */
const extractText = async (buffer) => {
    try {
        const data = await pdf(buffer);
        return data.text;
    } catch (error) {
        console.error('[SyllabusParser] Error extracting text:', error);
        throw new Error('Failed to parse PDF syllabus');
    }
};

/**
 * Analyzes text to find academic keywords and estimate difficulty.
 * @param {string} text 
 * @returns {Object} { keywords: [], difficulty: string, topicCount: number }
 */
const analyzeSyllabusText = (text) => {
    const foundKeywords = new Set();
    let difficultyScore = 0;
    const lowerText = text.toLowerCase();

    // Scan for keywords
    Object.entries(ACADEMIC_KEYWORDS).forEach(([level, keywords]) => {
        keywords.forEach(keyword => {
            if (lowerText.includes(keyword.toLowerCase())) {
                foundKeywords.add(keyword);
                if (level === 'Advanced') difficultyScore += 3;
                else if (level === 'Intermediate') difficultyScore += 2;
                else difficultyScore += 1;
            }
        });
    });

    // Estimate difficulty level
    let difficulty = 'Introductory';
    if (difficultyScore >= 15 || foundKeywords.size >= 10) difficulty = 'Hard';
    else if (difficultyScore >= 5 || foundKeywords.size >= 5) difficulty = 'Medium';
    else if (difficultyScore > 0) difficulty = 'Easy';

    return {
        detectedKeywords: Array.from(foundKeywords),
        difficultyLevel: difficulty,
        topicCount: foundKeywords.size
    };
};

/**
 * Process a syllabus file and return analysis results.
 * @param {string} filePath 
 */
const parseSyllabus = async (filePath) => {
    const buffer = await fs.readFile(filePath);
    const text = await extractText(buffer);
    return analyzeSyllabusText(text);
};

module.exports = {
    extractText,
    analyzeSyllabusText,
    parseSyllabus
};
