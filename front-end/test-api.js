// Test script to validate local data and API wrapper functionality
import { apiService } from './src/services/apiWrapper';
import { localDataAPI } from './src/services/localData';

async function runTests() {
  console.log('🧪 Starting API Tests...\n');

  try {
    // Test 1: Check current mode
    console.log('📋 Current Mode:', apiService.getCurrentMode());
    
    // Test 2: Fetch all seasons
    console.log('\n📚 Fetching all seasons...');
    const seasons = await apiService.getAllSeasons();
    console.log(`✅ Successfully loaded ${seasons.length} seasons`);
    console.log('Sample season:', seasons[0]);
    
    // Test 3: Fetch missions for first season
    if (seasons.length > 0) {
      console.log('\n🎯 Fetching missions for first season...');
      const firstSeasonId = String(seasons[0].id);
      const { season, missions } = await apiService.getSeasonWithMissions(firstSeasonId);
      console.log(`✅ Successfully loaded ${missions.length} missions for season:`, season.title);
      console.log('Sample mission:', missions[0]);
    }
    
    // Test 4: Fetch all modules
    console.log('\n📦 Fetching all modules...');
    const modules = await apiService.getAllModules();
    console.log(`✅ Successfully loaded ${modules.length} modules`);
    
    // Test 5: Test recommendations
    console.log('\n⭐ Fetching recommendations...');
    const recommendations = await apiService.getRecommendations();
    console.log(`✅ Successfully loaded ${recommendations.length} recommendations`);
    
    // Test 6: Test chat simulation
    console.log('\n💬 Testing chat functionality...');
    const chatResponse = await apiService.sendMessage('Olá, como posso começar?');
    console.log('✅ Chat response received:', chatResponse.success ? 'SUCCESS' : 'FAILED');
    if (chatResponse.success) {
      console.log('Chat message:', chatResponse.data.message);
    }
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('Current mode:', apiService.getCurrentMode());
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  runTests();
}

export { runTests };