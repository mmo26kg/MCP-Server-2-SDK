export class ToolBuilder {
    constructor(name) {
        this.name = name;
        this.options = {};
        this._handler = null;
    }

    setTitle(title) {
        this.options.title = title;
        return this;
    }

    setDescription(description) {
        this.options.description = description;
        return this;
    }

    setInputSchema(schema) {
        this.options.inputSchema = schema;
        return this;
    }

    setHandler(handler) {
        this._handler = handler;
        return this;
    }

    build() {
        if (!this.options.title || !this.options.description || !this.options.inputSchema) {
            throw new Error("Tool options (title, description, inputSchema) are required");
        }
        if (!this._handler) throw new Error("Tool handler is required");
        return {
            name: this.name,
            options: this.options,
            handler: this._handler
        };
    }
}
