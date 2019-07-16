/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
		
        it('Feeds are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

		 it('URL is defined for each feed', () => {
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBe("");
			});
		 });

		it('Name is defined for each feed', () => {
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toBe("");
			});
		});
    });


	describe('The menu', function() {

		it('Menu is hidden', () => {
			expect($("body")[0].classList.contains("menu-hidden")).toBe(true);
		});
			
		it('Menu is hidden when clicked twice', () => {
			// Do the first click
			$(".menu-icon-link").trigger("click");  // Trigger click on this element
			expect($("body")[0].classList.contains("menu-hidden")).toBe(false);  // Element should be displayed
			
			// Do the second click - menu should be set to hidden
			$(".menu-icon-link").trigger("click");
			expect($("body")[0].classList.contains("menu-hidden")).toBe(true);  // Element should not be displayed
		});
	});


	describe('Initial Entries', function() {

		beforeEach(function(done) {
			loadFeed(0, done);
		});
  
		it('Feed exists after loadFeed is called', function(done) {
			let container = $('.feed');
			expect(container[0].childElementCount).toBeGreaterThan(0);  // Entry should be inside .feed element
			expect(container[0].children[0].childNodes[1].classList.contains("entry")).toBe(true);  // Entry should have a class .entry

			done();
		});
	});
		
	describe('New Feed Selection', function() {
		
		let firstFeedItem, secondFeedItem;
        let containerFirst, containerSecond;
		
        beforeEach(function(done) {
				
			// First loadFeed is called
            loadFeed(0, () => {
                containerFirst = $('.feed');
                firstFeedItem = containerFirst[0].firstElementChild.href; // Take the content
				console.log(firstFeedItem);
				
				// Second loadFeed is called
                loadFeed(1, () => {
                    containerSecond = $('.feed');
                    secondFeedItem = containerSecond[0].firstElementChild.href;  // Take the content
					console.log(secondFeedItem);
                    done();
                });
            });
        });

		it('New feed is loaded', function(done) {
			expect(firstFeedItem).not.toBe(secondFeedItem);
			done();
		});		 
	});
}());
