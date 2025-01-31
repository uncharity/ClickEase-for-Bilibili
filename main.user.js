// ==UserScript==
// @name         ClickEase for Bilibili
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  使用键盘代替鼠标点击
// @author       uncharity
// @license      MIT
// @icon         https://www.bilibili.com/favicon.ico
// @supportURL   https://github.com/uncharity/ClickEase-for-Bilibili/issues
// @match        https://*.bilibili.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  // 搜索输入框选择器配置
  const SEARCH_SELECTORS = {
    default: "input.nav-search-input",
    search: "input.search-input-el",
  };

  // 判断是否为搜索页面
  const isSearchPage = () =>
    window.location.href.includes("search.bilibili.com");

  // 获取当前页面的搜索输入框
  const getSearchInput = () => {
    const selector = isSearchPage()
      ? SEARCH_SELECTORS.search
      : SEARCH_SELECTORS.default;
    return document.querySelector(selector);
  };

  // 处理输入框失焦
  const handleInputBlur = (activeElement) => {
    activeElement.blur();
    ["mousedown", "click"].forEach((eventType) => {
      const event = new Event(eventType, {
        bubbles: true,
        cancelable: true,
      });
      document.body.dispatchEvent(event);
    });
  };

  // 键盘事件处理
  const handleKeydown = (event) => {
    if (event.key === "/") {
      const input = getSearchInput();
      if (input && document.activeElement !== input) {
        event.preventDefault();
        input.focus();
      }
    } else if (event.key === "Escape") {
      const activeElement = document.activeElement;
      if (activeElement.tagName.toLowerCase() === "input") {
        handleInputBlur(activeElement);
      }
    }
  };
  document.addEventListener("keydown", handleKeydown);
})();
