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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        //tests if all feeds are defined and for there to be more then 0 feeds
        it('all the feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        //tests if all urls are defined and for there to be more then 0 urls
        it('all the urls are defined', function(){
            for(var i = 0,feed_length=allFeeds.length; i<feed_length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });
        //tests if all the names are defined and for there to be more then 0 names
        it('all the names are defined', function(){
            for(var i = 0,feed_length1=allFeeds.length; i<feed_length1; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });
    //writes a test suite named the menu
    describe('The menu', function(){
        //makes sure menu is not visible by checking if the body has the class of menu-hidden
        it('menu not visible', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         //makes sure that on click the visibility of the menu screen is toggled on and hide when clicked again 
        it('toggles visibility on click', function() {
            $('a.menu-icon-link').trigger('click'); // show menu
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('a.menu-icon-link').trigger('click'); // hide menu again
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
    });

    //a test suite named initial entries
    describe('Initial Entries', function(){
        /*Writes a test that ensures when the loadFeed
         function is called and completes its work, there is at least
         a single .entry element within the .feed container.*/
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('at least single entry in feed', function() {
            expect($('.feed').has('.entry').length).toBeGreaterThan(0);
        });

    });
    //a test suite named new feed selection
    describe('New Feed Selection', function(){
        var initfeed;

        beforeEach(function (done) {
            //this successfully loads the feed #1
            loadFeed(0, function () {
                initfeed = $('.feed').html();

                //this successfully loads the feed #2
                loadFeed(1, function () {
                    done();
                });
            });

        });
        //this loads a new feed and checks for the new feed not to be the same as the last one
        it('load new feed', function (done) {
            var new_feed = $('.feed').html();
            expect(new_feed).not.toBe(initfeed);
            done();
        });
    });

        
}());
