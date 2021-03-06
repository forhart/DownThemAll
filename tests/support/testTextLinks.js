module("textlinks.jsm");

test("exports", function() {
	checkExports("resource://dta/support/textlinks.jsm", ["getTextLinks", "FakeLink"]);
});

test("regular", function() {
	var {getTextLinks} = importModule("resource://dta/support/textlinks.jsm");
	deepEqual(getTextLinks("http://downthemall.net/"), ["http://downthemall.net/"]);
	deepEqual(getTextLinks("https://downthemall.net/"), ["https://downthemall.net/"]);
	deepEqual(getTextLinks("ftp://downthemall.net/"), ["ftp://downthemall.net/"]);
});

test("www", function() {
	var {getTextLinks} = importModule("resource://dta/support/textlinks.jsm");
	deepEqual(getTextLinks("www.downthemall.net"), ["http://www.downthemall.net/"]);
	deepEqual(getTextLinks("downthemall.net/"), []);
});

test("hxp", function() {
	var {getTextLinks} = importModule("resource://dta/support/textlinks.jsm");
	deepEqual(getTextLinks("hp://downthemall.net/"), ["http://downthemall.net/"]);
	deepEqual(getTextLinks("hxp://downthemall.net/"), ["http://downthemall.net/"]);
	deepEqual(getTextLinks("hxxp://downthemall.net/"), ["http://downthemall.net/"]);
	deepEqual(getTextLinks("hxxxps://downthemall.net/"), ["https://downthemall.net/"]);
	deepEqual(getTextLinks("fxp://downthemall.net/"), ["ftp://downthemall.net/"]);
});

test("3dots", function() {
	var {getTextLinks} = importModule("resource://dta/support/textlinks.jsm");
	deepEqual(getTextLinks("http://downthemall.net/crop...ped"), []);
	deepEqual(getTextLinks("http://downthemall.net/crop.....ped"), []);
});

test("sanitize", function() {
	var {getTextLinks} = importModule("resource://dta/support/textlinks.jsm");
	deepEqual(getTextLinks("<http://downthemall.net/>"), ["http://downthemall.net/"]);
	deepEqual(getTextLinks("http://downthemall.net/#foo"), ["http://downthemall.net/"]);
	deepEqual(getTextLinks("<http://downthemall.net/#foo>"), ["http://downthemall.net/"]);
});

test("FakeLink", function() {
	var {FakeLink} = importModule("resource://dta/support/textlinks.jsm");
	var l = new FakeLink("http://downthemall.net/");
	equal(l.href, "http://downthemall.net/", "href");
	equal(l.toString(), "http://downthemall.net/", "toString");
	strictEqual(l.title, undefined, "title1");
	deepEqual(l.childNodes, [], "childNodes");
	equal(typeof l.hasAttribute, "function", "hasAttribute");
	equal(l.hasAttribute("foo"), false, "hasAttribute foo");
	equal(l.hasAttribute("href"), true, "hasAttribute href");
	equal(l.hasAttribute("title"), false, "hasAttribute title");

	equal(typeof l.getAttribute, "function", "hasAttribute");
	equal(l.getAttribute("href"), l.href, "getAttribute href");

	l = new FakeLink("http://downthemall.net/", "title");
	equal(l.hasAttribute("title"), true, "hasAttribute title2");
	equal(l.getAttribute("title"), l.title, "getAttribute title");
});
