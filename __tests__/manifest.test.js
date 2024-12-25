const manifest = require('../manifest.json');

describe('manifest.json', () => {
  it('should have a name', () => {
    expect(manifest.name).toBeDefined();
  });

  it('should have a version', () => {
    expect(manifest.version).toBeDefined();
  });

  it('should have a description', () => {
    expect(manifest.description).toBeDefined();
  });
  it('should have a manifest_version of 3', () => {
    expect(manifest.manifest_version).toBe(3);
  });
 it('should have a background service worker', () => {
    expect(manifest.background).toBeDefined();
    expect(manifest.background.service_worker).toBe('background.js');
  });
  it('should have an action with a default popup', () => {
    expect(manifest.action).toBeDefined();
    expect(manifest.action.default_popup).toBe('popup.html');
    expect(manifest.action.default_icon).toBeDefined();
  });
  it('should have content_scripts', () => {
       expect(manifest.content_scripts).toBeDefined();
      expect(manifest.content_scripts[0].matches[0]).toBe("<all_urls>");
       expect(manifest.content_scripts[0].js[0]).toBe("content.js");
  });
    it('should have permissions', () => {
        expect(manifest.permissions).toBeDefined();
        expect(manifest.permissions).toContain("activeTab");
        expect(manifest.permissions).toContain("scripting");
        expect(manifest.permissions).toContain("storage");
    });
     it('should have host_permissions', () => {
        expect(manifest.host_permissions).toBeDefined();
        expect(manifest.host_permissions).toContain("<all_urls>");
    });

});