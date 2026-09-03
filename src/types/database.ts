export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_categories: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name_ar: string
          name_en: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name_ar: string
          name_en: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name_ar?: string
          name_en?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          author_name: string
          category_id: string | null
          content: Json
          cover_alt_ar: string
          cover_alt_en: string | null
          cover_image_url: string
          created_at: string
          deck_ar: string
          deck_en: string | null
          excerpt_ar: string
          excerpt_en: string | null
          id: string
          is_featured: boolean
          og_image_url: string | null
          published_at: string | null
          reading_time: number
          related_slugs: string[]
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          title_ar: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          author_name?: string
          category_id?: string | null
          content?: Json
          cover_alt_ar: string
          cover_alt_en?: string | null
          cover_image_url: string
          created_at?: string
          deck_ar: string
          deck_en?: string | null
          excerpt_ar: string
          excerpt_en?: string | null
          id?: string
          is_featured?: boolean
          og_image_url?: string | null
          published_at?: string | null
          reading_time?: number
          related_slugs?: string[]
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          title_ar: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          author_name?: string
          category_id?: string | null
          content?: Json
          cover_alt_ar?: string
          cover_alt_en?: string | null
          cover_image_url?: string
          created_at?: string
          deck_ar?: string
          deck_en?: string | null
          excerpt_ar?: string
          excerpt_en?: string | null
          id?: string
          is_featured?: boolean
          og_image_url?: string | null
          published_at?: string | null
          reading_time?: number
          related_slugs?: string[]
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          title_ar?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      media_assets: {
        Row: {
          alt_text_ar: string
          alt_text_en: string | null
          bucket: string
          created_at: string
          filename: string
          height: number | null
          id: string
          mime_type: string | null
          path: string
          size: number | null
          uploaded_by: string | null
          width: number | null
        }
        Insert: {
          alt_text_ar?: string
          alt_text_en?: string | null
          bucket?: string
          created_at?: string
          filename: string
          height?: number | null
          id?: string
          mime_type?: string | null
          path: string
          size?: number | null
          uploaded_by?: string | null
          width?: number | null
        }
        Update: {
          alt_text_ar?: string
          alt_text_en?: string | null
          bucket?: string
          created_at?: string
          filename?: string
          height?: number | null
          id?: string
          mime_type?: string | null
          path?: string
          size?: number | null
          uploaded_by?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_assets_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          is_featured: boolean
          logo_url: string | null
          name: string
          slug: string
          sort_order: number
          type: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          is_featured?: boolean
          logo_url?: string | null
          name: string
          slug: string
          sort_order?: number
          type?: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          is_featured?: boolean
          logo_url?: string | null
          name?: string
          slug?: string
          sort_order?: number
          type?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name: string
          id: string
          role: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_gallery: {
        Row: {
          alt_text_ar: string
          alt_text_en: string | null
          caption_ar: string | null
          caption_en: string | null
          created_at: string
          id: string
          image_url: string
          project_id: string
          sort_order: number
        }
        Insert: {
          alt_text_ar: string
          alt_text_en?: string | null
          caption_ar?: string | null
          caption_en?: string | null
          created_at?: string
          id?: string
          image_url: string
          project_id: string
          sort_order?: number
        }
        Update: {
          alt_text_ar?: string
          alt_text_en?: string | null
          caption_ar?: string | null
          caption_en?: string | null
          created_at?: string
          id?: string
          image_url?: string
          project_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_gallery_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          approach_ar: string | null
          category: string | null
          challenge_ar: string | null
          client_name: string | null
          cover_alt_ar: string
          cover_alt_en: string | null
          cover_image_url: string
          created_at: string
          execution_ar: string | null
          id: string
          is_featured: boolean
          is_published: boolean
          result_ar: string | null
          seo_description: string | null
          seo_title: string | null
          services: string[]
          short_description_ar: string
          short_description_en: string | null
          slug: string
          sort_order: number
          thumbnail_image_url: string | null
          title_ar: string
          title_en: string | null
          updated_at: string
          year: number | null
        }
        Insert: {
          approach_ar?: string | null
          category?: string | null
          challenge_ar?: string | null
          client_name?: string | null
          cover_alt_ar: string
          cover_alt_en?: string | null
          cover_image_url: string
          created_at?: string
          execution_ar?: string | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          result_ar?: string | null
          seo_description?: string | null
          seo_title?: string | null
          services?: string[]
          short_description_ar: string
          short_description_en?: string | null
          slug: string
          sort_order?: number
          thumbnail_image_url?: string | null
          title_ar: string
          title_en?: string | null
          updated_at?: string
          year?: number | null
        }
        Update: {
          approach_ar?: string | null
          category?: string | null
          challenge_ar?: string | null
          client_name?: string | null
          cover_alt_ar?: string
          cover_alt_en?: string | null
          cover_image_url?: string
          created_at?: string
          execution_ar?: string | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          result_ar?: string | null
          seo_description?: string | null
          seo_title?: string | null
          services?: string[]
          short_description_ar?: string
          short_description_en?: string | null
          slug?: string
          sort_order?: number
          thumbnail_image_url?: string | null
          title_ar?: string
          title_en?: string | null
          updated_at?: string
          year?: number | null
        }
        Relationships: []
      }
      scenario_steps: {
        Row: {
          created_at: string
          description_ar: string | null
          id: string
          scenario_id: string
          sort_order: number
          step_number: string
          title_ar: string
          title_en: string | null
        }
        Insert: {
          created_at?: string
          description_ar?: string | null
          id?: string
          scenario_id: string
          sort_order?: number
          step_number: string
          title_ar: string
          title_en?: string | null
        }
        Update: {
          created_at?: string
          description_ar?: string | null
          id?: string
          scenario_id?: string
          sort_order?: number
          step_number?: string
          title_ar?: string
          title_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scenario_steps_scenario_id_fkey"
            columns: ["scenario_id"]
            isOneToOne: false
            referencedRelation: "scenarios"
            referencedColumns: ["id"]
          },
        ]
      }
      scenarios: {
        Row: {
          cover_alt_ar: string
          cover_alt_en: string | null
          cover_image_url: string
          created_at: string
          cta_ar: Json
          description_ar: string
          description_en: string | null
          focus: string
          hero_keywords: string[]
          id: string
          intro_ar: string
          intro_en: string | null
          is_featured: boolean
          is_published: boolean
          keywords: string[]
          number: string
          og_image_url: string | null
          philosophy_ar: Json
          possible_outputs: Json
          scenario_label: string
          seo_description: string | null
          seo_title: string | null
          situation_ar: Json
          situation_en: Json
          slug: string
          sort_order: number
          title_ar: string
          title_en: string | null
          updated_at: string
          what_we_look_for: Json
        }
        Insert: {
          cover_alt_ar: string
          cover_alt_en?: string | null
          cover_image_url: string
          created_at?: string
          cta_ar?: Json
          description_ar: string
          description_en?: string | null
          focus: string
          hero_keywords?: string[]
          id?: string
          intro_ar: string
          intro_en?: string | null
          is_featured?: boolean
          is_published?: boolean
          keywords?: string[]
          number: string
          og_image_url?: string | null
          philosophy_ar?: Json
          possible_outputs?: Json
          scenario_label: string
          seo_description?: string | null
          seo_title?: string | null
          situation_ar?: Json
          situation_en?: Json
          slug: string
          sort_order?: number
          title_ar: string
          title_en?: string | null
          updated_at?: string
          what_we_look_for?: Json
        }
        Update: {
          cover_alt_ar?: string
          cover_alt_en?: string | null
          cover_image_url?: string
          created_at?: string
          cta_ar?: Json
          description_ar?: string
          description_en?: string | null
          focus?: string
          hero_keywords?: string[]
          id?: string
          intro_ar?: string
          intro_en?: string | null
          is_featured?: boolean
          is_published?: boolean
          keywords?: string[]
          number?: string
          og_image_url?: string | null
          philosophy_ar?: Json
          possible_outputs?: Json
          scenario_label?: string
          seo_description?: string | null
          seo_title?: string | null
          situation_ar?: Json
          situation_en?: Json
          slug?: string
          sort_order?: number
          title_ar?: string
          title_en?: string | null
          updated_at?: string
          what_we_look_for?: Json
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description_ar: string
          description_en: string | null
          id: string
          image_alt_ar: string
          image_alt_en: string | null
          image_url: string
          is_active: boolean
          number: string
          slug: string
          sort_order: number
          tags: string[]
          title_ar: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_ar: string
          description_en?: string | null
          id?: string
          image_alt_ar: string
          image_alt_en?: string | null
          image_url: string
          is_active?: boolean
          number: string
          slug: string
          sort_order?: number
          tags?: string[]
          title_ar: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_ar?: string
          description_en?: string | null
          id?: string
          image_alt_ar?: string
          image_alt_en?: string | null
          image_url?: string
          is_active?: boolean
          number?: string
          slug?: string
          sort_order?: number
          tags?: string[]
          title_ar?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          description: string | null
          is_public: boolean
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          description?: string | null
          is_public?: boolean
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          description?: string | null
          is_public?: boolean
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio_ar: string | null
          bio_en: string | null
          created_at: string
          id: string
          is_active: boolean
          name: string
          photo_url: string | null
          role_ar: string
          role_en: string | null
          social_links: Json
          sort_order: number
          updated_at: string
        }
        Insert: {
          bio_ar?: string | null
          bio_en?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          photo_url?: string | null
          role_ar: string
          role_en?: string | null
          social_links?: Json
          sort_order?: number
          updated_at?: string
        }
        Update: {
          bio_ar?: string | null
          bio_en?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          photo_url?: string | null
          role_ar?: string
          role_en?: string | null
          social_links?: Json
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

export type ProfileRow = Tables<"profiles">
export type SiteSettingRow = Tables<"site_settings">
export type ServiceRow = Tables<"services">
export type ScenarioRow = Tables<"scenarios">
export type ScenarioStepRow = Tables<"scenario_steps">
export type BlogCategoryRow = Tables<"blog_categories">
export type BlogPostRow = Tables<"blog_posts">
export type ProjectRow = Tables<"projects">
export type ProjectGalleryRow = Tables<"project_gallery">
export type TeamMemberRow = Tables<"team_members">
export type MediaAssetRow = Tables<"media_assets">
export type PartnerRow = Omit<Tables<"partners">, "type"> & {
  type: "partner" | "client" | "collaborator"
}
