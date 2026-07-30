export interface GeckoImageItem {
  /**
   * Stable ID for React rendering.
   * Existing images use the database ID.
   * New uploads get a temporary UUID.
   */
  id: string;

  /**
   * File selected by the user.
   * Undefined for existing images.
   */
  file?: File;

  /**
   * Public image URL.
   * Empty until a new image is uploaded.
   */
  image: string;

  /**
   * True if this is the cover image.
   */
  isCover: boolean;

  /**
   * True if the image already exists in Supabase.
   */
  existing: boolean;
}