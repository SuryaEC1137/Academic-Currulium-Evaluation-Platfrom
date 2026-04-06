const { analyzeSyllabusText } = require('./utils/syllabusParser');

const testCases = [
    {
        name: 'Empty text',
        text: '',
        expectedLevel: 'Introductory',
        expectedKeywordCount: 0
    },
    {
        name: 'Introductory Syllabus',
        text: 'This is an Introduction to Programming. We will cover basic principles and fundamental concepts.',
        expectedLevel: 'Easy',
        expectedKeywordCount: 3
    },
    {
        name: 'Advanced Syllabus',
        text: 'Quantum Computing and Distributed Systems. Advanced topics in Cryptography and Neural Networks. Scalability in Distributed Heuristics.',
        expectedLevel: 'Hard',
        expectedKeywordCount: 7
    },
    {
        name: 'Intermediate Syllabus',
        text: 'Data Structures and Algorithms. Database systems and Computer Networks. Software Engineering principles.',
        expectedLevel: 'Medium',
        expectedKeywordCount: 5
    }
];

console.log('--- Starting Syllabus Parser Logic Tests ---');

testCases.forEach(tc => {
    console.log(`\nTesting: ${tc.name}`);
    const result = analyzeSyllabusText(tc.text);
    console.log('Result:', result);

    const levelMatch = result.difficultyLevel === tc.expectedLevel;
    const countMatch = result.detectedKeywords.length === tc.expectedKeywordCount;

    if (levelMatch && countMatch) {
        console.log('✅ PASS');
    } else {
        console.log('❌ FAIL');
        if (!levelMatch) console.log(`   Level Mismatch: Expected ${tc.expectedLevel}, got ${result.difficultyLevel}`);
        if (!countMatch) console.log(`   Count Mismatch: Expected ${tc.expectedKeywordCount}, got ${result.detectedKeywords.length}`);
    }
});

console.log('\n--- Tests Complete ---');
